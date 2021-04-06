/* The main container that wraps the body of all pages */

import React from 'react';
import { VStack } from '@chakra-ui/react';

const PageContainer = ({ children }) => (
  <VStack
    spacing={10}
    w="100%"
    h="100%"
    align="flex-start"
    overflow="auto"
    p={{ base: '32px', md: '48px', lg: '64px', xl: '72px' }}
  >
    {children}
  </VStack>
);

export default PageContainer;
