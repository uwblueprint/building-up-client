import * as React from 'react';
import { forwardRef } from '@chakra-ui/system';
import { Container } from '@chakra-ui/react';

export const PADDING_X = { base: 8, lg: 10 };
export const PADDING_Y = { base: 6, lg: 8, xl: 12 };

/**
 * PageContainer with responsive padding for the storefront pages
 *
 */
export const PageContainer = forwardRef((props, ref) => {
  const { ...rest } = props;

  return (
    <Container
      ref={ref}
      maxW="container.xl"
      display="flex"
      flexDirection="column"
      flex="1"
      px={PADDING_X}
      py={PADDING_Y}
      {...rest}
    />
  );
});
