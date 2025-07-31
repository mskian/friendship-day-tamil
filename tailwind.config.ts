import { type Config } from "tailwindcss";

export default {
  content: [
    "./routes/**/*.{ts,tsx, js, jsx}",
    "./islands/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;