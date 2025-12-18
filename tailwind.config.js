/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk,md}",
    ],
  plugins: [require('@tailwindcss/postcss'),],
}