/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				"spin-ease": "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
			}
		},
	},
	plugins: [],
}
