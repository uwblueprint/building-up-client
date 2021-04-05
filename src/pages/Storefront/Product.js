import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useShopify } from 'hooks/useShopify';
import { ProductDetails } from '../../components/storefront';
import PageNotFound from './PageNotFound';

const Product = () => {
  const { id } = useParams();
  const {
    products: { loading, data },
  } = useShopify();

  const product = data.find(product => product.id === id);

  return product ? <ProductDetails product={product} /> : <PageNotFound />;
};

export default Product;
