<template>
	<div w="20%" un-border="1 red">
		PatternImport

		<PatternSet
			v-for="(set, index) in props.modelValue"
			:key="index"
			:modelValue="set"
			@update:modelValue="updateModelValue(index, $event)"
			@click:remove="handleRemove(index)"
		/>

		<button @click="handleAdd">+</button>
	</div>
</template>

<script setup lang="ts">
import PatternSet from "@/components/PatternSet.vue";
import type { PropType } from "vue";
import type { stitch } from "@/types";

const props = defineProps({
	modelValue: {
		type: Array as PropType<Array<stitch>>,
	},
});

const emits = defineEmits(["update:modelValue"]);

function updateModelValue(index: number, value: stitch) {
	const copyValue = [...(props.modelValue ?? [])];
	copyValue.splice(index, 1, value);
	emits("update:modelValue", copyValue);
}
function handleAdd() {
	const copyValue = [...(props.modelValue ?? [])];
	copyValue.push({
		color: "#ffffff",
		count: 1,
	});
	emits("update:modelValue", copyValue);
}
function handleRemove(index: number) {
	const copyValue = [...(props.modelValue ?? [])];
	copyValue.splice(index, 1);
	emits("update:modelValue", copyValue);
}
</script>
