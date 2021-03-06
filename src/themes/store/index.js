import { extendTheme } from '@chakra-ui/react';

const storeTheme = extendTheme({
  fonts: {
    body: 'Karla, system-ui, sans-serif',
    heading: 'Jost, system-ui, sans-serif',
  },
  colors: {
    brand: {
      gray: '#7C7C7C',
      red: '#CD1000',
      darkred: '#B20E00',
    },
  },
});

export default storeTheme;
