import * as React from 'react';
import { VStack } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';

import Item from '../Item/Item';
import { ItemGrid, ItemGridSkeleton, SectionHeader } from '../Layout/Layout';

const BestSellers = () => {
  const {
    collections: { loading, data },
  } = useShopify();
  const bestSellersCollection = data.find(({ handle }) => handle === 'best-sellers');

  return (
    <VStack textAlign="center">
      <SectionHeader title="Best Sellers" subtitle="Don't Miss Out" />
      <ItemGrid>
        {loading ? (
          <ItemGridSkeleton />
        ) : (
          bestSellersCollection &&
          bestSellersCollection.products.map(({ id, title, images, variants, availableForSale }) => (
            <Item
              key={id}
              id={id}
              name={title}
              image={images && images[0].src}
              price={variants && variants[0].price}
              availableForSale={availableForSale}
            />
          ))
        )}
      </ItemGrid>
    </VStack>
  );
};

export default BestSellers;
