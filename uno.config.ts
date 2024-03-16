import { defineConfig, presetUno, presetAttributify } from "unocss";
import presetTagify from "@unocss/preset-tagify";

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify({
			prefix: "style-",
		}),
		presetTagify({
			prefix: "style-",
		}),
	],
	theme: {
		colors: {
			primary: "#A1CCD1",
			hint: "#7C9D96",
			secondary: "#E9B384",
			light: "#F4F2DE",
			text: "#11323E",
		},
	},
	rules: [
		[
			/^bucket-(.*)$/,
			([, c], { theme }) => {
				if (theme["colors"][c])
					return { ["background-color"]: theme["colors"][c] };
			},
		],
		[
			/^text-(.*)$/,
			([, c], { theme }) => {
				if (theme["colors"][c])
					return { ["color"]: theme["colors"][c] };
			},
		],
	],
});
