<template>
	<div inline-block :w="`${props.size}px`" :h="`${props.size}px`">
		<svg
			:width="props.size"
			:height="props.size"
			viewBox="0 0 26 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M25.9903 3.99076C22.2937 1.47323 17.8178 0 12.995 0C8.17238 0 3.69658 1.47315 0 3.99058C3.69664 6.50811 8.17253 7.98133 12.9953 7.98133C17.8179 7.98133 22.2937 6.50818 25.9903 3.99076Z"
				:fill="String(props.color)"
			/>
		</svg>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	size: {
		type: Number,
		default: 10,
	},
	color: {
		type: String,
		default: "#ffffff",
	},
	vertical: {
		type: Boolean,
		default: false,
	},
});
</script>
