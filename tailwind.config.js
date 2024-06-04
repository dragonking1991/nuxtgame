module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      xxl: ['28px', '36px'],
    },
    extend: {
      fontFamily: {
        'uh': ['TCCC-UnityHeadline', 'Helvetica', 'Arial', 'sans-serif'],
        'ut': ['TCCC-UnityText', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'yellow': '#FFD100',
        'green': '#00A74A',
        'red': '#BF1004',
        'gray': '#727171',
        'gray-light': '#D6D5D4',
      },
    },
  },
  plugins: [],
}
