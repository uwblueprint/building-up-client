// Abstracting this as its own component, it's going to need to access the state and render a "badge" with the # of items in the cart
// https://chakra-ui.com/docs/media-and-icons/icon#using-the-createicon-function
import React from 'react';
import { createIcon } from '@chakra-ui/react';

const BagIcon = createIcon({
  displayName: 'BagIcon_',
  viewBox: '0 0 34 42',
  path: [
    <path
      d="M0.396287 37.638L2.59078 13.4833C2.77797 11.4229 4.50548 9.84521 6.57438 9.84521H28.3367C30.4652 9.84521 32.2209 11.5122 32.3313 13.6378L33.5853 37.7926C33.704 40.0801 31.8813 42 29.5907 42H4.37988C2.02785 42 0.183477 39.9804 0.396287 37.638Z"
      fill="currentColor"
    />,
    <path
      d="M25.1466 9.84526C24.2167 4.26066 22.946 2.17896 18.1386 2.01269C11.9017 1.81237 10.2799 3.96413 9.06934 9.84526"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />,
    <line x1="9.74512" y1="9.84521" x2="9.74512" y2="18.09" stroke="black" strokeWidth="3" />,
    <line x1="25.4102" y1="9.84521" x2="25.4102" y2="18.09" stroke="black" strokeWidth="3" />,
  ],
});

export default BagIcon;
