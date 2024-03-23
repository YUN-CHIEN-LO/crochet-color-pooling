<template>
	<div
		:style="{
			opacity: props.placeholder ? 0 : 1,
		}"
		inline-block
		:w="`${props.size / 2}px`"
		:h="`${props.size}px`"
	>
		<svg
			:width="props.size / 3"
			:height="props.size"
			viewBox="0 0 8 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.99508 25.9859C6.51261 22.2893 7.98584 17.8134 7.98584 12.9906C7.98584 8.16798 6.51269 3.69219 3.99526 -0.00439471C1.47773 3.69224 0.00450593 8.16813 0.00450572 12.9909C0.0045055 17.8135 1.47766 22.2893 3.99508 25.9859Z"
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
	placeholder: {
		type: Boolean,
		default: false,
	},
});
</script>
