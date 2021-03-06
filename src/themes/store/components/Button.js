const Button = {
  // The styles all buttons have in common
  baseStyle: {
    borderRadius: 'none',
    textTransform: 'uppercase',
  },
  // We can override sizes here, if we want to
  sizes: {
    lg: {
      h: '16',
    },
    md: {
      h: '16',
    },
    sm: {
      h: '52px',
    },
  },
  // The default variant is solid, so we must override colors here
  variants: {
    solid: {
      color: 'white',
      bg: 'black',
      _hover: {
        bg: 'brand.darkgray',
      },
      _active: {
        bg: 'brand.darkgray',
      },
    },
    inverted: {
      bg: 'white',
      border: '1px black solid',
      _hover: {
        color: 'white',
        bg: 'brand.darkgray',
        border: '1px black solid',
      },
      _active: {
        color: 'white',
        bg: 'brand.darkgray',
        border: '1px black solid',
      },
    },
  },
  // The default button prop values
  defaultProps: {},
};

export default Button;
