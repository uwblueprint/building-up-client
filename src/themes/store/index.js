import { extendTheme } from '@chakra-ui/react';
import Heading from './components/Heading';
import Button from './components/Button';

const storeTheme = extendTheme({
  fonts: {
    body: 'Karla, system-ui, sans-serif',
    heading: 'Jost, system-ui, sans-serif',
  },
  colors: {
    brand: {
      gray: '#7C7C7C',
      darkgray: '#333333',
      red: '#CD1000',
      darkred: '#B20E00',
    },
  },

  components: { Heading, Button },
});

export default storeTheme;
