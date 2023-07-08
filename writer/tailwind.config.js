/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
        'cardStory': '0 5px 5px -3px rgb(0 0 0 / 16%), 0 8px 10px 1px rgb(0 0 0 / 11%), 0 3px 14px 2px rgb(0 0 0 / 10%)',
      }
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')({ nocompatible: true }), require('flowbite/plugin')],
  darkMode: "class"
}

