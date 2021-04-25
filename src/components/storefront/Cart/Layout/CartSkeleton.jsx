import React from 'react';
import { HStack, VStack, Skeleton, SkeletonText } from '@chakra-ui/react';

const SKELETON_RESPONSIVE_SIZE = { base: '150px', md: '200px' };

const CartItemsSkeleton = ({ numItems = 3 }) => {
  return (
    <VStack flex={1} h="100%" spacing={8} w={{ base: '100%', md: 'auto' }}>
      {Array(numItems)
        .fill(0)
        .map((_, i) => (
          <HStack spacing={6} w="100%" key={i}>
            <Skeleton h={SKELETON_RESPONSIVE_SIZE} w={SKELETON_RESPONSIVE_SIZE} />
            <SkeletonText h={SKELETON_RESPONSIVE_SIZE} flex="1" noOfLines={8} />
          </HStack>
        ))}
    </VStack>
  );
};

const OrderSummarySkeleton = () => {
  return <Skeleton h="300px" w={{ base: '100%', md: '35%' }} />;
};

const CartSkeleton = () => {
  return (
    <>
      <CartItemsSkeleton />
      <OrderSummarySkeleton />
    </>
  );
};

export default React.memo(CartSkeleton);
