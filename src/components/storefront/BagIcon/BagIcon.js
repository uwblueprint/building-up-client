// https://chakra-ui.com/docs/media-and-icons/icon#using-the-createicon-function
import React from 'react';
import { createIcon, Circle, Box, Heading } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';

const BagIcon = createIcon({
  displayName: 'BagIcon_',
  viewBox: '0 0 34 42',
  path: [
    <path
      d="M0.396287 37.638L2.59078 13.4833C2.77797 11.4229 4.50548 9.84521 6.57438 9.84521H28.3367C30.4652 9.84521 32.2209 11.5122 32.3313 13.6378L33.5853 37.7926C33.704 40.0801 31.8813 42 29.5907 42H4.37988C2.02785 42 0.183477 39.9804 0.396287 37.638Z"
      fill="currentColor"
      key="1"
    />,
    <path
      d="M25.1466 9.84526C24.2167 4.26066 22.946 2.17896 18.1386 2.01269C11.9017 1.81237 10.2799 3.96413 9.06934 9.84526"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      key="2"
    />,
    <line x1="9.74512" y1="9.84521" x2="9.74512" y2="18.09" stroke="black" strokeWidth="3" key="3" />,
    <line x1="25.4102" y1="9.84521" x2="25.4102" y2="18.09" stroke="black" strokeWidth="3" key="4" />,
  ],
});

const BagIconWithIndicator = () => {
  const {
    checkout: { data },
  } = useShopify();
  const cartItemsCount = data?.lineItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <Box pos="relative">
      <BagIcon height="28px" width="28px" />
      {cartItemsCount > 0 && (
        <Circle size="22px" bg="brand.red" color="white" pos="absolute" top="15px" left="15px">
          <Heading size="lightCaption">{cartItemsCount <= 9 ? cartItemsCount : '9+'}</Heading>
        </Circle>
      )}
    </Box>
  );
};

export default BagIconWithIndicator;
