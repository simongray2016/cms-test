/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: "Plus Jakarta Sans",
    },
    extend: {
      colors: {
        primary: "#5d87ff",
        secondary: "#44b7f7",
      },
    },
  },
  plugins: [],
};
