import { extendTheme } from '@chakra-ui/react';
import Heading from './components/Heading';

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

  components: { Heading },
});

export default storeTheme;
