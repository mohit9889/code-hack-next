/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-gray": "#E3E3E3",
      orange: "#FF570C",
      white: "#fff",
      "black-primary": "#323643",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "18rem",
        xl: "19rem",
        "2xl": "20rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)"],
      },
    },
  },
  plugins: [],
};
