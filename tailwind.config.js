/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSubtle: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' },
          '20%,24%,55%': { opacity: '0.85' },
        },
        riseSubtle: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float-subtle': 'floatSubtle 3s ease-in-out infinite',
        'flicker-subtle': 'flicker 1.5s infinite',
        'rise-subtle': 'riseSubtle 6s linear infinite',
      },
    },
  },
  plugins: [],
};
