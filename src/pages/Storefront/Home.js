import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { BestSellers, AllItems } from 'components/storefront';
import { PageContainer } from 'components/storefront/PageContainer/PageContainer';

const Home = () => (
  <Box>
    <PageContainer>
      <BestSellers />
    </PageContainer>
    <Box bg="black">
      <PageContainer bg="black">
        <AllItems />
      </PageContainer>
    </Box>
  </Box>
);

export default Home;
