import { extendTheme } from '@chakra-ui/react';
import Button from './components/Button';

const storeTheme = extendTheme({
  colors: {
    brand: {
      primary: '#CD1000',
      secondary: '#B20E00',
    },
  },
});
const dashboardTheme = extendTheme({
  colors: {
    brand: {
      primary: '#FBEBEB',
    },
    background: {
      primary: '#FAFAFA',
      secondary: '#262626',
    },
  },
  components: {
    Button,
  },
});

export { dashboardTheme, storeTheme };
