import React, { memo } from 'react';
import { AspectRatio, Skeleton } from '@chakra-ui/react';

const ItemGridSkeleton = ({ numItems = 3 }) =>
  Array(numItems)
    .fill(0)
    .map((_, i) => (
      <AspectRatio ratio={1} key={i}>
        <Skeleton />
      </AspectRatio>
    ));

export default memo(ItemGridSkeleton);
