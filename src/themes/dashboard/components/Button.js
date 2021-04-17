const Button = {
  // The styles all buttons have in common
  baseStyle: {},
  // We can override sizes here, if we want to
  sizes: {},
  // The default variant is solid, so we must override colors here
  variants: {
    default: {
      bg: 'brand.50',
      _hover: {
        bg: 'brand.100',
      },
      _active: {
        bg: 'brand.200',
      },
    },
    black: {
      bg: 'black',
      color: 'white',
      _hover: {
        bg: 'gray.800',
        _disabled: {
          bg: 'black',
        },
      },
      _active: {
        bg: 'gray.700',
      },
    },
  },
  // The default button prop values
  defaultProps: {
    variant: 'default',
  },
};

export default Button;
