/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C4C4C4",
        secondary: "#0861FA",
        alert: "#E9A21C",
        danger: "#FE5C3B",
        success: "#2BBB4D",
        darkGradient: "#B7BAC4",
        ligthGradient: "#E7E9ED",
      },
    },
  },
  plugins: [],
};
