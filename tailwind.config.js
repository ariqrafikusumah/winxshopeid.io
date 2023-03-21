/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xss': '320px',
      'xs': '375px',
      'sm': '425px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
    },
    extend: {},
  },
  plugins: [],
}