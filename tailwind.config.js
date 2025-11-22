/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        btgBlue: "#003366",
        btgBlueLight: "#2563eb",
        btgGreen: "#22c55e",
        btgGray: "#f1f5f9",
      },
    },
  },
  plugins: [],
};
