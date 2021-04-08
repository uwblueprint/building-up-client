import * as React from 'react';
import { BestSellers, ItemListings } from '../../components/storefront';
import { Container } from '@chakra-ui/react';

const Home = () => (
  <Container maxW="container.xl" display="flex" flexDirection="column" flex="1" py={20} px={24}>
    <BestSellers />
    <ItemListings />
  </Container>
);

export default Home;
