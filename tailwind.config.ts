import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#DC143C', // Nepal crimson
          600: '#c41230',
          700: '#a30f28',
          800: '#7f0c1f',
          900: '#5c0916',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#003893', // Nepal blue
          600: '#00307d',
          700: '#002867',
          800: '#001f51',
          900: '#00173b',
        },
        accent: {
          500: '#FFD700', // Gold
          600: '#e6c200',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        nepali: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
