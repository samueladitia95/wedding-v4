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
				rome: ["Times New Roman", ...defaultTheme.fontFamily.serif],
			},
			fontSize: {
				"4.5xl": "40px",
			},
			colors: {
				"text-primary": "#202020",
				"bg-primary": "#1A1A1A",
				"bg-attire": "#121212",
				"green-sage": "#7B7D68",
				"error": "#FF3E3E",
				"ring": "rgba(255, 255, 255, 0.23)"
			},
		},
		container: {
			center: true,
			padding: "2rem",
		},
	},
	plugins: [],
};
