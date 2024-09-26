/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        open: ['Open Sans', 'sans-serif'],
        squada: ['MuseoModerno', 'sans-serif']
      },
      fontSize: {
        base: ['14px', '16.8px'],
        sm: ['12px', '14.4px']
      },
      strokeWidth: {
        1: 1.3
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true
    })
  ]
}
