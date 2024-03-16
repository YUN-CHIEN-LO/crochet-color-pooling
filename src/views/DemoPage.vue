<template>
	<style-flex page bucket="light" justify="center" items="start">
		<PatternImport v-model="currentSets" />
		<PatternPreview />

		<pre>{{ currentSets }}</pre>
	</style-flex>
</template>

<script setup lang="ts">
import PatternImport from "@/components/PatternImport.vue";
import PatternPreview from "@/components/PatternPreview.vue";
import { ref } from "vue";

const currentSets = ref([
	{
		color: "#00ff00",
		count: 2,
	},
	{
		color: "#aaff44",
		count: 2,
	},
	{
		color: "#ffffff",
		count: 3,
	},
]);
</script>
