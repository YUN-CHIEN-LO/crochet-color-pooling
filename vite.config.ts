import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import postcssPresetEnv from "postcss-preset-env";
import unocss from "@unocss/postcss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), UnoCSS()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/"),
		},
	},
	css: {
		postcss: {
			plugins: [postcssPresetEnv(), unocss()],
		},
	},
});
