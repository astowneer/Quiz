import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myColor: {
          "50": "#ebeff7",
          "100": "#d7deef",
          "200": "#aebedf",
          "300": "#869dd0",
          "400": "#5d7dc0",
          "500": "#355cb0",
          "600": "#2a4a8d",
          "700": "#20376a",
          "800": "#152546",
          "900": "#0b1223"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
