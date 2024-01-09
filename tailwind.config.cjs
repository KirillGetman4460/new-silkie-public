/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
],
  plugins: [
            require('daisyui'),
            require('@tailwindcss/forms')
          ],
  darkMode: 'class',
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
  },
  theme: {
   colors: {
      'white1': '#FFFFFF',
      'gray-1': '#F7F7F9',
      'gray-2': '#E4E4E7',
      'black-1': '#BFBFBF',
      'black-2': '#7E7E7E',
      'black-3': '#1D2122',
      'overlay': '#1D2122',
      'yellow-1': '#FFAA17',
      'yellow-2': '#d3dce6',
      'yellow-3': '#FFDEA3',
      'yellow-4': '#FFC156',
      'yellow-5': '#FFAA17',
      'blue-1': '#334DBC',
      'blue-2': '#330066',
      'red': '#FF2F0A',
    },
    fontSize:{
      "xs":'12px',
      "sm":"14px",
      "base":'15px',
      "normal":'16px',
      "lg":"18px"
    },
    fontWeight:{
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    screens:{
      "ipad":'769px',
      'mobile': '577px',
      'smallMobile':'575px'

    }
 }
});