/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dorado-claro": '#ffd700', // Corregido: comillas dobles
      }
    },
  },
  plugins: [],
}
