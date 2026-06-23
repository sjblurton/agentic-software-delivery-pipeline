import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        destructive: {
          DEFAULT: "oklch(0.577 0.201 27.32 / <alpha-value>)",
          foreground: "oklch(0.985 0 0 / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
