/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#19e66b",
        "background-light": "#f6f8f7",
        "background-dark": "#111111",
        "card-dark": "#191919",
        "border-dark": "#2a2a2a",
        "text-muted": "#777777",
        danger: "#ef4444",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
