import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';

import Item from '../Item/Item';
import { ItemGrid, ItemGridSkeleton, SectionHeader } from '../Layout/Layout';

const AllItems = () => {
  const {
    products: { loading, data },
  } = useShopify();

  return (
    <VStack textAlign="center" bg="black" color="white">
      <SectionHeader title="Toques & Accessories" subtitle="Shop All" />
      <ItemGrid>
        {loading ? (
          <ItemGridSkeleton />
        ) : (
          data &&
          data.map(({ id, title, images, variants }) => (
            <Item key={id} id={id} name={title} image={images && images[0].src} price={variants && variants[0].price} />
          ))
        )}
      </ItemGrid>
    </VStack>
  );
};

export default AllItems;
