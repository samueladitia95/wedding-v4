import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				arizona: ["Arizona", ...defaultTheme.fontFamily.sans],
				jakarta: ["Jakarta", ...defaultTheme.fontFamily.sans],
				ivora: ["ivyora-display", ...defaultTheme.fontFamily.sans],
				rome: ["Times New Roman", ...defaultTheme.fontFamily.serif],
				safira: ["Safira", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				"4.5xl": "40px",
			},
			colors: {
				"text-primary": "#202020",
				"bg-primary": "#1A1A1A",
				"bg-attire": "#121212",
				"green-sage": "#7B7D68",
				error: "#FF3E3E",
				ring: "rgba(255, 255, 255, 0.23)",
				"input-border": "rgba(255, 255, 255, 0.23)",
				"placeholder-text": "rgba(255, 255, 255, 0.78)",
				"disabled-button": "#6A6A6A",
				"disabled-text": "#888181",
				"bg-button": "rgba(255, 255, 255, 0.54)",
			},
		},
		container: {
			center: true,
			padding: "2rem",
		},
	},
	plugins: [],
};
