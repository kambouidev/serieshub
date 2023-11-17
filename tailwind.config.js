/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundColor: '#242424',
        blueColor: '#2a68ff',
        greyIsh: '#f1f4f8',
      },
    },
  },
  plugins: [],
};
