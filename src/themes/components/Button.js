const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
    },
    md: {
      fontSize: '16px',
      padding: '24px',
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'black.500',
    },
  },
  // The default size and variant values
  defaultProps: {
    bg: 'brand.primary',
  },
};

export default Button;
