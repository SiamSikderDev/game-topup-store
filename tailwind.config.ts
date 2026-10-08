import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDF5B4",
        card: "#FFFDF4",
        ink: "#181812",
        pop: "#FF5C38",
        sun: "#FFC53D",
        skyy: "#9BDCFF",
        lilac: "#D9C6FF",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "hard-sm": "3px 3px 0 #181812",
        hard: "5px 5px 0 #181812",
        "hard-lg": "8px 8px 0 #181812",
      },
    },
  },
  plugins: [],
};
export default config;
