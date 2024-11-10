import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      lineHeight:{
        'extra-loose': '1.20',
      },
      colors:{
        durbarDeep:"#F58B1E",
        durbarLight:"#F1D848",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        'team-banner': "url('/images/banner/team-banner.jpg')",
      }
    },
  },
  
  darkMode: "class",
  plugins: [nextui()],
}
