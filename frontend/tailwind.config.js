/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hoverColor: "#FFC000",
        brightColor: "#0A9DAE",
        backgroundColor: "#EDF6F7",
        textColor:"#039BAB",
      },
    },
  },
  plugins: [],
};
