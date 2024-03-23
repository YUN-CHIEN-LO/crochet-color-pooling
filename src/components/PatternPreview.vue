<template>
	<div w="80%" h="100%">
		<label for="stitchSize">stitchSize</label>
		<input
			id="stitchSize"
			name="stitchSize"
			w="100%"
			type="range"
			v-model="stitchSize"
			min="2"
			max="50"
		/>

		<label for="maxLength">maxLength</label>
		<input
			id="maxLength"
			name="maxLength"
			w="100%"
			type="range"
			v-model="maxLength"
			min="10"
			max="100"
		/>
		<input />

		<label for="isReverse"> isReverse</label>
		<input
			type="checkbox"
			id="isReverse"
			name="isReverse"
			v-model="isReverse"
		/>

		<label for="stitchType">stitchType</label>

		<select name="stitchType" id="stitchType" v-model="stitchType">
			<option value="default">default</option>
			<option value="single">single</option>
			<option value="moss">moss</option>
		</select>

		<p>pattern: {{ hoverGroup }}</p>
		<p>stitchType: {{ stitchType }}</p>
		<style-flex
			v-for="(r, ri) in rows"
			:key="ri"
			relative
			:style="{
				zIndex: maxLength - ri,
				height: `${stitchSize / (isMossStitch ? 1.5 : 1)}px`,
				width: `${
					stitchSize * maxLength * (isMossStitch ? 2 : 1) +
					(isDefaultStitch ? 0 : (stitchSize / 3) * 2)
				}px`,
				flexDirection: getDirection(ri),
			}"
		>
			<!-- vertical chain -->
			<VerticalChainStitch
				v-if="!isDefaultStitch"
				:size="stitchSize"
				:color="String(r[0].color)"
				:placeholder="isLastRow(ri, rows.length)"
			/>
			<div
				v-for="(unit, ui) in r"
				:key="`${unit.color}-${ri}-${ui}`"
				:style="{
					width: `${stitchSize * (isMossStitch ? 2 : 1)}px`,
					height: `${stitchSize}px`,
				}"
				:bucket="`${
					hoverGroup === unit.group ? 'primary' : 'transparent'
				}`"
				shrink="0"
				@mouseenter="handleHover(unit)"
				@mouseleave="hoverGroup = undefined"
			>
				<!-- start chain -->
				<div
					inline-block
					v-if="!isDefaultStitch && isLastRow(ri, rows.length)"
				>
					<ChainStitch
						:size="stitchSize"
						:color="String(unit.color)"
					/>
					<ChainStitch
						v-if="isMossStitch"
						:size="stitchSize"
						:color="String(unit.color)"
					/>
				</div>
				<!-- single -->
				<SingleStitch
					v-else-if="stitchType === 'single'"
					:size="stitchSize"
					:color="String(unit.color)"
				/>

				<div v-else-if="isMossStitch">
					<ChainStitch
						v-if="ri % 2 > 0"
						:size="stitchSize"
						:color="String(unit.color)"
					/>
					<SingleStitch
						:size="stitchSize"
						:color="String(unit.color)"
					/>
					<ChainStitch
						v-if="ri % 2 <= 0"
						:size="stitchSize"
						:color="String(unit.color)"
					/>
				</div>
				<div
					v-else
					w="80%"
					h="80%"
					m="10%"
					:style="{
						backgroundColor: String(unit.color),
					}"
				></div>
			</div>
			<!-- vertical chain -->
			<VerticalChainStitch
				v-if="!isDefaultStitch"
				:size="stitchSize"
				:color="String(r[0].color)"
				placeholder
			/>
		</style-flex>
	</div>
</template>

<script setup lang="ts">
import { ref, type PropType, watch, reactive, toRaw, computed } from "vue";
import type { stitch, pattern, unit } from "@/types";
import ChainStitch from "@/components/ChainStitch.vue";
import SingleStitch from "@/components/SingleStitch.vue";
import VerticalChainStitch from "@/components/VerticalChainStitch.vue";
const props = defineProps({
	modelValue: {
		type: Array as PropType<Array<stitch>>,
		default: () => [],
	},
});

const rows = ref([] as Array<pattern>);
const stitchSize = ref(30);
const hoverGroup = ref(undefined as number | undefined);

const isReverse = ref(false);
const maxLength = ref(11 as number);
const stitchType = ref("default" as string);
const isDefaultStitch = computed(() => stitchType.value === "default");
const isMossStitch = computed(() => stitchType.value === "moss");
function isLastRow(index, length) {
	return index === length - 1;
}
function getDirection(index) {
	if (!isReverse.value) return "row";
	return index % 2 > 0 ? "row-reverse" : "row";
}

function groupArray(array: pattern): Array<pattern> {
	return Array.from({ length: maxLength.value }, () =>
		array.splice(0, maxLength.value)
	);
}
const flattenPattern = reactive({ list: [] as pattern });

function getFlattenPattern(): pattern {
	return props.modelValue
		.reduce(
			(output, { color, count }) =>
				output.concat(Array(count).fill({ color })),
			[] as pattern
		)
		.map((unit, index) => ({ ...unit, index }));
}

function getRows() {
	const totalStitches = maxLength.value * maxLength.value;
	console.log(totalStitches);
	const totalRepeat = Math.ceil(totalStitches / flattenPattern.list.length);

	const stitches = Array(totalRepeat)
		.fill(toRaw(flattenPattern.list))
		.map((pat, i) =>
			[...pat].map((unit: unit) => ({ ...unit, group: i + 1 }))
		)
		.flat()
		.slice(0, totalStitches);

	return groupArray(stitches);
}

function handleHover(unit: unit) {
	hoverGroup.value = unit.group;
}

watch([maxLength, stitchType], () => {
	rows.value = getRows();
});
watch(
	() => props.modelValue,
	() => {
		flattenPattern.list = getFlattenPattern();
		rows.value = getRows();
	},
	{
		immediate: true,
		deep: true,
	}
);
</script>

<style lang="scss" scoped></style>
