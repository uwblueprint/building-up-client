/* 
  Useful references:
  * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/heading.ts 
  * https://chakra-ui.com/docs/theming/theme#typography
  * https://www.figma.com/file/s6xLJftM99Xto7FW9AAtGU/Building-Up---Dashboard?node-id=437%3A301
*/

const Heading = {
  sizes: {
    h1: {
      // 4xl = 2.25 rem = 36px
      // Same as the default "xl" heading size
      fontSize: ['3xl', null, '4xl'],
      lineHeight: [1.33, null, 1.2],
    },
    h2: {
      // 3xl = 1.75 rem = 30px
      // Same as the default "lg" heading size except fontWeight is semibold
      fontSize: ['2xl', null, '3xl'],
      lineHeight: [1.33, null, 1.2],
      fontWeight: 'semibold',
    },
    h3: {
      // 2xl = 24px
      fontSize: '2xl',
      lineHeight: 1.2,
      fontWeight: 'semibold',
    },
    h4: {
      // xl = 20px
      fontSize: 'xl',
      lineHeight: 1.2,
      fontWeight: 'semibold',
    },
    subtitle: {
      fontSize: 'md',
      lineHeight: 1.2,
      fontWeight: 'semibold',
      textTransform: 'uppercase',
    },
  },
  defaultProps: {
    size: 'h1',
  },
};

export default Heading;
