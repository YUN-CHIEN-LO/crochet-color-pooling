<template>
	<HomePage v-if="isView('home')" />
	<DemoPage v-if="isView('demo')" />
</template>

<script setup lang="ts">
import HomePage from "@/views/HomePage.vue";
import DemoPage from "@/views/DemoPage.vue";
import { ref } from "vue";

const currentPage = ref("demo");

/**
 * 是否檢視中
 * @param page - 頁面鍵值
 * @returns - 是否檢視中
 */
function isView(page: string): boolean {
	return page === currentPage.value;
}
</script>

<style>
@unocss;

body,
html {
	margin: 0;
	padding: 0;
	@apply bucket-secondary;
}
</style>
