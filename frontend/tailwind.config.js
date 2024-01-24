/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#267D9E",
        secondary: "#5699B3",
        success: "#198754",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#0DCAF0",
        light: "#F8F9FA",
        dark: "#212529",
      },
    },
  },
  plugins: [],
};
