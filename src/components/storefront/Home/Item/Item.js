import * as React from 'react';
import { AspectRatio, Center, VStack, Heading, Image, Link } from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';

import PreserveQueryParamsLink from 'components/storefront/PreserveQueryParamsLink/PreserveQueryParamsLink';

const OutOfStockMask = () => (
  <Center position="absolute" top={0} w="100%" h="100%" bg="rgba(128,128,128,0.6)">
    <Heading as="h4" size="h3" color="white">
      Out of Stock
    </Heading>
  </Center>
);

const Item = ({ id, name, image, price, availableForSale }) => {
  const { path } = useRouteMatch();

  return (
    <VStack textAlign="center">
      <Link position="relative" w="100%" as={PreserveQueryParamsLink} to={`${path}/products/${id}`} bg="white">
        <AspectRatio maxW="400px" ratio={1}>
          <Image border="1px solid black" src={image} alt={name} objectFit="cover" />
        </AspectRatio>
        {!availableForSale && <OutOfStockMask />}
      </Link>
      <Heading as="h4" size="subtitle" textTransform="uppercase">
        {name}
      </Heading>
      <Heading as="h4" size="subtitle">
        {`$${price}`}
      </Heading>
    </VStack>
  );
};

export default Item;
