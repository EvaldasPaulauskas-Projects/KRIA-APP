/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#4661E6',  // Blue color used for buttons
        primary2: '#38A169',  // Green color used for buttons
        secondary: '#2E3A59', // Dark background color for right section
        background: '#12172B', // Background color for the left section
        background2: '#2E3A59' // Background color for the left section
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
