/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#35C5F0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
