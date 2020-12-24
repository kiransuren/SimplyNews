const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      keyframes: {
        'expand': {
        '0%': { transform: 'scale(0)' },
        '80%': { transform: 'scale(1.2)' },
        '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'expand': 'expand .8s ease-out',
      },
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
    fontFamily: {
      custom: ['Playfair Display', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
}