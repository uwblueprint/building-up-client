import * as React from 'react';
import { Heading, HStack, VStack, Skeleton } from '@chakra-ui/react';
import { useShopify } from 'hooks/useShopify';
import Item from '../Item/Item';

const IMAGE_SQUARE_SIZE = 80;

const BestSellersSkeleton = () => (
  <>
    <Skeleton h={IMAGE_SQUARE_SIZE} w={IMAGE_SQUARE_SIZE} />
    <Skeleton h={IMAGE_SQUARE_SIZE} w={IMAGE_SQUARE_SIZE} />
    <Skeleton h={IMAGE_SQUARE_SIZE} w={IMAGE_SQUARE_SIZE} />
  </>
);

const BestSellers = () => {
  const {
    collections: { loading, data },
  } = useShopify();
  const bestSellersCollection = data.find(({ handle }) => handle === 'best-sellers');

  return (
    <VStack>
      <Heading as="h4" size="subtitle" color="brand.red">
        DON'T MISS OUT
      </Heading>
      <Heading mb={4}>BEST SELLERS</Heading>
      <HStack spacing={8}>
        {loading ? (
          <BestSellersSkeleton />
        ) : (
          bestSellersCollection &&
          bestSellersCollection.products.map(({ id, title, images, variants }) => (
            <Item key={id} id={id} name={title} image={images && images[0].src} price={variants && variants[0].price} />
          ))
        )}
      </HStack>
    </VStack>
  );
};

export default BestSellers;
