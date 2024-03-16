<template>
	<style-flex
		w="100%"
		h="40px"
		:style="{
			backgroundColor: color,
		}"
	>
		<input type="color" h="100%" m="0" v-model="color" />
		<input
			flex="1"
			type="number"
			min="1"
			max="50"
			step="1"
			v-model="count"
			backgroundColor="transparent"
			:style="{
				color: setContrast(color),
			}"
			@blur="count = numberFormat(count)"
		/>
		<button @click="handleRemove">-</button>
	</style-flex>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { stitch } from "@/types";

const props = defineProps({
	modelValue: {
		type: Object as PropType<stitch>,
		default: () =>
			({
				color: "#ffffff",
				count: 1,
			} as stitch),
	},
});
const emit = defineEmits(["update:modelValue", "click:remove"]);

function numberFormat(number: number): number {
	if (number < 1) return 1;
	if (number > 50) return 50;
	return number;
}

const color = computed({
	get() {
		return props.modelValue.color;
	},
	set(val) {
		emit("update:modelValue", {
			...props.modelValue,
			color: val,
		});
	},
});

const count = computed({
	get() {
		return props.modelValue.count;
	},
	set(val) {
		emit("update:modelValue", {
			...props.modelValue,
			count: val,
		});
	},
});

function setContrast(color: string) {
	const colorHex = color.replace(/^#/, "");
	const red = parseInt(colorHex.slice(0, 2), 16);
	const green = parseInt(colorHex.slice(2, 4), 16);
	const blue = parseInt(colorHex.slice(4, 6), 16);
	// http://www.w3.org/TR/AERT#color-contrast
	const brightness = Math.round(
		(red * 299 + green * 587 + blue * 114) / 1000
	);
	const textColor = brightness > 125 ? "black" : "white";
	return textColor;
}
function handleRemove() {
	emit("click:remove");
}
</script>

<style>
input {
	background: transparent;
	border: none;
	&:focus,
	&:active {
		border: none;
		outline: none;
	}
	/* Chrome, Safari, Edge, Opera */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		width: 20px !important;
		height: 40px;
	}

	/* Firefox */
	&[type="number"] {
		@apply p-3;
	}
}
</style>
