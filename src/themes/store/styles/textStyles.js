// https://chakra-ui.com/docs/features/text-and-layer-styles#text-styles

const headingsBase = { fontFamily: 'heading', fontWeight: 'bold' };

export const textStyles = {
  // 5xl = 3rem = 48px
  // 2xl = 1.5rem = 24px
  // xs = 0.75rem = 12px
  // wider = 0.05em
  h1: {
    ...headingsBase,
    fontSize: '5xl',
    lineHeight: '70px',
    letterSpacing: '0.02em',
  },
  h2: {
    ...headingsBase,
    fontSize: '40px',
    lineHeight: '58px',
    letterSpacing: '0.02em',
  },
  h3: {
    ...headingsBase,
    fontSize: '2xl',
    lineHeight: '35px',
    letterSpacing: '0.02em',
  },
  subtitle: {
    ...headingsBase,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: 'wider',
  },
  boldCaption: {
    ...headingsBase,
    fontSize: 'xs',
    lineHeight: '18px',
    letterSpacing: 'wider',
  },
  lightCaption: {
    ...headingsBase,
    fontSize: 'sm',
    lineHeight: '18px',
    letterSpacing: 'wider',
  },
};
