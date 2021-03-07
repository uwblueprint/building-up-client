const Button = {
  baseStyle: {
    borderRadius: 'none',
    textTransform: 'uppercase',
  },
  sizes: {
    lg: {
      h: '16',
      minW: '536px',
    },
    md: {
      h: '16',
      minW: '409px',
    },
    sm: {
      h: '52px',
      minW: '44',
    },
  },
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
      },
      _active: {
        color: 'white',
        bg: 'brand.darkgray',
      },
    },
  },
};

export default Button;
