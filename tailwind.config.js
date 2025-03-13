/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include the HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include JS/JSX files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin for Tailwind
  ],
}
