import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        basic: "#dedede",
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1B75BB', // Warna utama primary
          600: '#1769aa',
          700: '#155e99',
          800: '#134a80',
          900: '#0d3055',
        },
        secondary: {
          50: '#ffe4e6',
          100: '#fecdd3',
          200: '#fda4af',
          300: '#fb7185',
          400: '#f43f5e',
          500: '#EC2027', // Warna utama secondary
          600: '#c81e21',
          700: '#9b1c1c',
          800: '#771d1d',
          900: '#5f0f0f',
        },
        dark:"#0a1324",
        darkPrimary:"#111827",
        darkSecondary:"#1F2937"
      }
    },
  },
  mode: 'jit',
  darkMode: 'class',
  plugins: [],
};
export default config;
