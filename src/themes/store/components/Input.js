const Input = {
  parts: ['field'],
  baseStyle: {
    field: {
      textTransform: 'uppercase',
      color: 'brand.gray',
      fontSize: '14px',
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: '20px',
      letterSpacing: 'wider',
    },
  },
  sizes: {
    sm: {
      field: {
        height: '52px',
        py: '4',
        pl: '8',
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
