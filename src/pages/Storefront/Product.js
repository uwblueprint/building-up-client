import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';

import { useShopify } from 'hooks/useShopify';
import { ProductDetails } from '../../components/storefront';
import PageNotFound from './PageNotFound';

const ProductSkeleton = () => (
  <HStack flex="0.5" spacing={8} align="flex-start">
    <Skeleton flex="0.66" alignSelf="stretch" maxH="240px" />
    <Box flex="1">
      <SkeletonText noOfLines={8} spacing={4} flex="1" />
      <Skeleton mt={6} h="40px" />
    </Box>
  </HStack>
);

const Product = () => {
  const { id } = useParams();
  const {
    products: { loading: productsLoading, data: productsData },
    checkout: { loading: checkoutLoading },
  } = useShopify();

  const product = productsData.find(product => product.id === id);

  return productsLoading || checkoutLoading ? (
    <ProductSkeleton />
  ) : product ? (
    <ProductDetails product={product} />
  ) : (
    <PageNotFound />
  );
};

export default Product;
