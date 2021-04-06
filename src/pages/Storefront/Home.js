import * as React from 'react';
import { BestSellers, ItemListings } from '../../components/storefront';
import { Container } from '@chakra-ui/react';

const Home = () => (
  <Container maxW="container.xl" flex="1">
    <BestSellers />
    <ItemListings />
  </Container>
);

export default Home;
