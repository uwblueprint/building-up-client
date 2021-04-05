import * as React from 'react';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';
import Item from '../Item/Item';

const BestSellers = () => {
  const {
    collections: { loading, data },
  } = useShopify();
  const bestSellersCollection = data.find(({ handle }) => handle === 'best-sellers');

  return (
    <VStack p={24}>
      <Heading as="h4" size="subtitle" color="brand.red">
        DON'T MISS OUT
      </Heading>
      <Heading mb={4}>BEST SELLERS</Heading>
      <HStack spacing={8}>
        {bestSellersCollection &&
          bestSellersCollection.products.map(({ id, title, images, variants }) => (
            <Item key={id} id={id} name={title} image={images && images[0].src} price={variants && variants[0].price} />
          ))}
      </HStack>
    </VStack>
  );
};

export default BestSellers;
