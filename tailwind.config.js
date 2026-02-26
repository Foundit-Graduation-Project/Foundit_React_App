import tailwindcss from "@tailwindcss/vite";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "hero-bg": "url('/images/bg.jpg')",
      // },
      keyframes: {
        "progress-indicator": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "progress-indicator": "progress-indicator 0.6s ease-in-out",
      },
    },
  },
  plugins: [tailwindcss()],
};
