import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useShopify } from 'hooks/useShopify';
import { ProductDetails } from '../../components/storefront';
import { Container } from '@chakra-ui/react';
import PageNotFound from './PageNotFound';

const Product = () => {
  const { id } = useParams();
  const { products } = useShopify();

  const product = products.find(product => product.id === id);

  return product ? (
    <Container maxW="container.xl" flex="1">
      <ProductDetails product={product} />{' '}
    </Container>
  ) : (
    <PageNotFound />
  );
};

export default Product;
