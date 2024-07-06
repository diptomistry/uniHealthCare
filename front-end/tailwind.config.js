import svgToDataUri from "mini-svg-data-uri";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx}", "node_modules/tw-elements-react/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      colors: {
        hoverColor: "#FFC000",
        brightColor: "#0A9DAE",
        backgroundColor: "#EDF6F7",
        textColor: "#039BAB",
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
