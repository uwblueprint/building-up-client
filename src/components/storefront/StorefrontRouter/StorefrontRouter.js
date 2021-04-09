import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import storeTheme from 'themes/store';
import { useShopify } from '../../../hooks/useShopify';
import { Navbar, Footer } from '../';
import Home from 'pages/Storefront/Home';
import Product from 'pages/Storefront/Product';
import PageNotFound from 'pages/Storefront/PageNotFound';
import Cart from 'pages/Storefront/Cart';

const StorefrontRouter = () => {
  const { createShop, initializeCheckout, fetchProducts, fetchCollections } = useShopify();
  const { path } = useRouteMatch();

  useEffect(() => {
    // Component on mount: Fetch all data required for Shopify (products, collections, and checkout)
    createShop();
    fetchProducts();
    fetchCollections();
    initializeCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider theme={storeTheme}>
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Switch>
          <Route exact path={path}>
            <Home />
          </Route>
          <Route path={`${path}/products/:id`}>
            <Product />
          </Route>
          <Route path={`${path}/cart`}>
            <Cart />
          </Route>
          <Route path={`${path}/*`}>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

export default StorefrontRouter;
