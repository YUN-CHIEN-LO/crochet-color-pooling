<template>
	<style-flex page bucket="light" justify="center" items="start">
		<PatternImport v-model="currentSets" />
		<PatternPreview v-model="currentSets" />
	</style-flex>
</template>

<script setup lang="ts">
import PatternImport from "@/components/PatternImport.vue";
import PatternPreview from "@/components/PatternPreview.vue";
import { ref } from "vue";

const currentSets = ref([
	{
		color: "#b098ed",
		count: 2,
	},
	{
		color: "#98d8ed",
		count: 2,
	},
	{
		color: "#ffffff",
		count: 3,
	},
	// {
	// 	color: "#98d8ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#b098ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#ffffff",
	// 	count: 3,
	// },
	// {
	// 	color: "#98d8ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#b098ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#ffffff",
	// 	count: 3,
	// },
	// {
	// 	color: "#b098ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#98d8ed",
	// 	count: 2,
	// },
	// {
	// 	color: "#ffffff",
	// 	count: 3,
	// },
]);
</script>
