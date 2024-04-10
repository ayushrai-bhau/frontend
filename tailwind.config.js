/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 22px 4px rgba(255, 32, 32, 0.25)',
      }
    },
  },
  plugins: [],
}
