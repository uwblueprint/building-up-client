import * as React from 'react';
import { Heading, HStack, VStack } from '@chakra-ui/layout';
import Item from '../common/Item';

const BestSellers = ({ items }) => {
  return (
    <VStack p={24}>
      <Heading as="h4" size="subtitle" color="brand.red">
        DON'T MISS OUT
      </Heading>
      <Heading mb={4}>BEST SELLERS</Heading>
      <HStack spacing={8}>
        {items.map(({ id, title, images, price }) => (
          <Item key={id} name={title} image={images && images[0].src} price={'15'} />
        ))}
      </HStack>
    </VStack>
  );
};

export default BestSellers;
