/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(table|radio|pagination|dropdown).js",
  ],
  theme: {
    colors: {
      UA_red: '#9E1B32',
      bama_burgundy: '#772432',
      bama_roll_red: '#D0103A',
      bama_ivory: '#DAD7CB',
      bama_gray: '#C1C6C9',
      bama_dark_gray: '#5F6A72',
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
