/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary :'#40A2D8',
        secondary : '#0B60B0',
        accent:'#F0EDCF'
      },
      
    },
  },
  plugins: [],
}

