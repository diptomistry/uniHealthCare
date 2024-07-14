const svgToDataUri = require("mini-svg-data-uri");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx}", "node_modules/tw-elements-react/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        slidein: "slidein 1s ease 300ms",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        hoverColor: "#FC9F5A",
        brightColor: "#039BAB",
        backgroundColor: "#03C9D7",
        textColor: "#343E39",
        primaryColor:"#24bd9c",
        secondaryColor:"#6cd2be",
        
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        hindSiliguri: ["Hind Siliguri", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      const colors = theme('colors');
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: colors, type: "color" }
      );
    },
  ],
};
