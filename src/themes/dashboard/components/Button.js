const Button = {
  // The styles all buttons have in common
  baseStyle: {},
  // We can override sizes here, if we want to
  sizes: {},
  // The default variant is solid, so we must override colors here
  variants: {
    solid: {
      bg: 'brand.50',
      _hover: {
        bg: 'brand.100',
      },
      _active: {
        bg: 'brand.200',
      },
    },
  },
  // The default button prop values
  defaultProps: {},
};

export default Button;
