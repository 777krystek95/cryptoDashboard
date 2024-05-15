/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
  ['./dist/*.html'],
  theme: {
    extend: {
			fontFamily: {
				sans: ["Rubik", "sans-serif"],
			},
		},
  },
  plugins: [require("daisyui")],
}

