import { extendTheme } from '@chakra-ui/react';

import { textStyles } from './styles';
import Heading from './components/Heading';
import Button from './components/Button';
import Input from './components/Input';

const storeTheme = extendTheme({
  fonts: {
    body: 'Karla, system-ui, sans-serif',
    heading: 'Jost, system-ui, sans-serif',
  },
  colors: {
    brand: {
      lightgray: '#E8E8E8',
      gray: '#7C7C7C',
      darkgray: '#333333',
      lightred: '#F5D5D5',
      red: '#CD1000',
      darkred: '#B20E00',
    },
  },
  textStyles,

  components: { Heading, Button, Input },
});

export default storeTheme;
