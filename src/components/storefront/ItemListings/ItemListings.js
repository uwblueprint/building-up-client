import * as React from 'react';
import { Heading, Grid, VStack } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';

import Item from '../Item/Item';
import ItemGridSkeleton from '../ItemGridSkeleton/ItemGridSkeleton';

const ItemListings = () => {
  const {
    products: { loading, data },
  } = useShopify();

  return (
    <VStack textAlign="center" bg="black" color="white">
      <Heading as="h4" size="subtitle" color="brand.red" textTransform="uppercase">
        Shop All
      </Heading>
      <Heading mb={4} textTransform="uppercase">
        Toques & Accessories
      </Heading>
      <Grid minH={40} gap={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }} w="100%">
        {loading ? (
          <ItemGridSkeleton />
        ) : (
          data &&
          data.map(({ id, title, images, variants }) => (
            <Item key={id} id={id} name={title} image={images && images[0].src} price={variants && variants[0].price} />
          ))
        )}
      </Grid>
    </VStack>
  );
};

export default ItemListings;
