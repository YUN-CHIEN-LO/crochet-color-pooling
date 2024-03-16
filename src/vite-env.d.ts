/// <reference types="vite/client" />

declare module "*.vue" {
	import { ComponentOptions } from "vue";
	const componentOptions: ComponentOptions;
	export default componentOptions;
}

import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@vue/runtime-dom" {
	interface HTMLAttributes extends AttributifyAttributes {}
}
