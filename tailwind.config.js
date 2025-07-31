/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#EAE9E5',
        l_color_o: {
          DEFAULT: "#CD612D",
          400: "#d78157",
          600: "#A25F3B",
        },
        l_color_v: {
          DEFAULT: "#47797A",
          600: "#3C5050",
          var: "#A7A692"
        },
        l_color_r: {
          DEFAULT: "#9D1A2E",
          600: "#742732",
          var: "#791524"
        },
        l_color_y: {
          DEFAULT: "#BBB237",
          600: "#908A42",
          700: "#65633F"
          
        },
      },
      fontFamily: {
        loto: ["Lato", "sans-serif"],
      },
      screens: {
        '1110px': '1110px', 
        '360px': '360px',
        '1580px': '1580px',
        '700px': '700px',
      },
    },
  },
  plugins: [],
}

