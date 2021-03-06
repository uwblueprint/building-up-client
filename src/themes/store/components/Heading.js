const Heading = {
  sizes: {
    // 5xl = 3rem = 48px
    // 2xl = 1.5rem = 24px
    // xs = 0.75rem = 12px
    // wider = 0.05em
    h1: {
      fontSize: '5xl',
      lineHeight: '70px',
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '40px',
      lineHeight: '58px',
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '2xl',
      lineHeight: '35px',
      letterSpacing: '0.02em',
    },
    subtitle: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 'wider',
    },
    boldCaption: {
      fontSize: 'xs',
      lineHeight: '18px',
      letterSpacing: 'wider',
    },
    lightCaption: {
      fontSize: 'xs',
      lineHeight: '18px',
      letterSpacing: 'wider',
      fontWeight: 'normal',
    },
  },
  defaultProps: {
    size: 'h1',
  },
};

export default Heading;
