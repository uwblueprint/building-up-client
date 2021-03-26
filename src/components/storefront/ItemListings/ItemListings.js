import * as React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const ItemListings = () => {
  return (
    <Flex bgColor="black" h={28}>
      <Heading as="h3" size="md" color="white">
        Item Listings
      </Heading>
    </Flex>
  );
};

export default ItemListings;
