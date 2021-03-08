const Table = {
  // The styles all buttons have in common
  baseStyle: {
    th: {
      bg: 'background.primary',
    },
    tr: {
      bg: 'background.primary',
      _hover: {
        bg: '#eaeaea',
      },
    },
  },
  sizes: {
    md: {
      th: {
        py: '4',
        lineHeight: '5',
        fontSize: 'md',
      },
    },
  },
  variants: {
    simple: {
      th: {
        color: '#7d7d7d',
        borderBottom: '0px',
      },
      td: {
        borderBottom: '0px',
      },
    },
  },
};

export default Table;
