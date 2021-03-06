const Input = {
  parts: ['field'],
  baseStyle: {
    field: {
      p: '12px 16px',
      textTransform: 'uppercase',
      fontSize: '14px',
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'brand.gray',
      lineHeight: '20px',
      letterSpacing: 'wider',
    },
  },
  sizes: {
    sm: {
      field: {
        height: '52px',
        borderRadius: 'none',
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: 'brand.gray',
        _hover: {
          borderColor: 'brand.lightred',
        },
        _focus: {
          borderColor: 'brand.lightred',
        },
      },
    },
  },
  defaultProps: {
    size: 'sm',
    focusBorderColor: 'brand.50',
  },
};

export default Input;
