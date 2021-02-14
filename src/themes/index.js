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
      50: '#fbebeb',
      100: '#edc1c1',
      200: '#e39898',
      300: '#da6f6e',
      400: '#d24845',
      500: '#b9302b',
      600: '#902622',
      700: '#661b18',
      800: '#3d100f',
      900: '#150404',
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
