/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        'button': ':hover:after'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
