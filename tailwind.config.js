module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      'white': {
        DEFAULT: "var(--white)",
      },
      'grey': {
        DEFAULT: "var(--def-grey)",
        dark: "var(--dark-grey)",
      },
      'light': {
        DEFAULT: "var(--def-light)",
        dark: "var(--dark-light)",
        darker: "var(--darker-light)"
      },
      'blue': {
        light: "var(--light-blue)",
        DEFAULT: "var(--def-blue)",
        dark: "var(--dark-blue)",
      },
      'yellow': {
        DEFAULT: "var(--def-yellow)",
      },
      'red': {
        light: "var(--light-red)",
        DEFAULT: "var(--def-red)",
        dark: "var(--dark-red)"
      },
      'green': {
        light: "var(--light-green)",
        DEFAULT: "var(--def-green)",
        dark: "var(--dark-green)"
      }
    },
    fontFamily: {
      'body': ['"Nunito"'],
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
