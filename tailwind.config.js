/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' },
          '20%,24%,55%': { opacity: '0.8' },
        },
        rise: {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(-10vh)' },
        },
        hue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        flicker: 'flicker 1.5s infinite',
        rise: 'rise linear infinite',
        hue: 'hue 10s linear infinite',
      },
    },
  },
  plugins: [],
};