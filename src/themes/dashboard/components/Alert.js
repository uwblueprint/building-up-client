const Alert = {
  parts: ['container', 'title', 'description', 'icon'],
  // The styles all Alerts have in common
  baseStyle: {},
  // We can override sizes here, if we want to
  sizes: {},
  variants: {
    subtle: {
      container: {
        color: 'white',
        bg: 'rgba(0,0,0,0.7)',
      },
    },
  },
  // The default button prop values
  defaultProps: {},
};

export default Alert;
