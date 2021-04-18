import * as React from 'react';
import { Heading, Grid, VStack } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';

import Item from '../Item/Item';
import ItemGridSkeleton from '../ItemGridSkeleton/ItemGridSkeleton';

const BestSellers = () => {
  const {
    collections: { loading, data },
  } = useShopify();
  const bestSellersCollection = data.find(({ handle }) => handle === 'best-sellers');

  return (
    <VStack textAlign="center">
      <Heading as="h4" size="subtitle" color="brand.red">
        DON'T MISS OUT
      </Heading>
      <Heading mb={4}>BEST SELLERS</Heading>
      <Grid minH={40} gap={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }} w="100%">
        {loading ? (
          <ItemGridSkeleton />
        ) : (
          bestSellersCollection &&
          bestSellersCollection.products.map(({ id, title, images, variants }) => (
            <Item key={id} id={id} name={title} image={images && images[0].src} price={variants && variants[0].price} />
          ))
        )}
      </Grid>
    </VStack>
  );
};

export default BestSellers;
