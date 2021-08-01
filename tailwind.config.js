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
