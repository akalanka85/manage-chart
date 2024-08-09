/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      lightGreen: '#e0f2f1',
      darkGreen: '#009688',
      activeGreen: '#2ec17d',
      white: '#fff',
      red: '#ef4444',
      gray: '#d1d0d0',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
