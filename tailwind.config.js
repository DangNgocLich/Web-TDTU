module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './web/component/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%'
      },
      minWidth: {
        '72':'250px'
      },
      colors: {
        white: 'white'
      }
    },
    minWidth: {
      '0':'0',
      '1/4':'25%',
      '1/2':'50%',
      'full':'100%'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
