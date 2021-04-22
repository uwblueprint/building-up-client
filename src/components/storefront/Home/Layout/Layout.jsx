import React, { memo } from 'react';
import { AspectRatio, Grid, Heading, Skeleton } from '@chakra-ui/react';
import { forwardRef } from '@chakra-ui/system';

export const SectionHeader = ({ title, subtitle }) => {
  return (
    <>
      <Heading as="h4" size="subtitle" color="brand.red" textTransform="uppercase">
        {subtitle}
      </Heading>
      <Heading mb={4} textTransform="uppercase">
        {title}
      </Heading>
    </>
  );
};

/**
 * Responsive grid for listing items
 * - 3 columns on large screens
 * - 1 column on mobile screens
 *
 * Composes Chakra's `Grid` component
 */
export const ItemGrid = forwardRef((props, ref) => {
  return (
    <Grid
      ref={ref}
      minH={40}
      gap={8}
      templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
      w="100%"
      {...props}
    />
  );
});

/**
 * Loading skeleton for the item listings
 */
export const ItemGridSkeleton = memo(({ numItems = 3 }) =>
  Array(numItems)
    .fill(0)
    .map((_, i) => (
      <AspectRatio ratio={1} key={i}>
        <Skeleton />
      </AspectRatio>
    )),
);
