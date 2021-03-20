import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Navbar, BestSellers, ItemListings, Footer } from 'components/storefront';
import { useShopify } from 'hooks/useShopify';
import storeTheme from 'themes/store';

const Store = () => {
  const { createShop, createCheckout, fetchProducts, fetchCollections } = useShopify();

  useEffect(() => {
    // Component on mount (i.e. app init): Try to fetch user data (Apollo client internally uses a cookie)
    createShop();
    fetchProducts();
    fetchCollections();
    createCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider theme={storeTheme}>
      <Navbar />
      <BestSellers />
      <ItemListings />
      <Footer />
    </ChakraProvider>
  );
};

export default Store;
