/* 
  Useful references:
  * https://chakra-ui.com/docs/form/input
  * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
*/

const Input = {
  parts: ['field'],
  baseStyle: {
    field: {
      p: '12px 16px',
    },
  },
  sizes: {
    md: {
      field: {
        height: '48px',
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
  defaultProps: {
    focusBorderColor: 'brand.50',
  },
};

export default Input;
