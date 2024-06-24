import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				arizona: ["Arizona", ...defaultTheme.fontFamily.sans],
				jakarta: ["Jakarta", ...defaultTheme.fontFamily.sans],
				safira: ["Safira", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				"4.5xl": "40px",
			},
		},
		container: {
			center: true,
			padding: "2rem",
		},
	},
	plugins: [],
};
