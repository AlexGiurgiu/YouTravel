/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],  // <-- old style, safe
  theme: {
    extend: {
      colors: {
        navy: "#1D3557",
        coral: "#E76F51",
        peach: "#FFF7ED",
        darkblue: "#0F1F36",
      },
    },
  },
  plugins: [],
};