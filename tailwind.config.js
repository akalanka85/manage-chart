/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      lightGreen: '#ddf0e8',
      white: '#fff'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
