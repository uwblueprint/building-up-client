import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_TEAM_INFO } from 'data/gql/team';
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
  const {
    createShop,
    initializeCheckout,
    fetchProducts,
    fetchCollections,
    checkout,
    updateCartAttributes,
  } = useShopify();
  const { path } = useRouteMatch();

  useEffect(() => {
    // Component on mount: Fetch all data required for Shopify (products, collections, and checkout)
    createShop();
    fetchProducts();
    fetchCollections();
    initializeCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [getTeam, { loading: getTeamLoading, error: getTeamError, data: getTeamData }] = useLazyQuery(GET_TEAM_INFO);
  const { search } = useLocation();

  // Keep track of the current checkout ID in a ref
  const checkoutId = useRef(null);

  useEffect(() => {
    if (search) {
      const queries = new URLSearchParams(search);
      const teamId = queries.get('team');
      if (teamId) {
        getTeam({ variables: { id: teamId } });
      }
    }
  }, [search, getTeam]);

  // After the checkout is loaded AND the getTeam query succeeds, update the checkout with our team ID
  useEffect(() => {
    // Only update when teamId is available AND checkout ID changes
    if ((getTeamData || getTeamError) && checkout.data && checkout.data.id !== checkoutId.current) {
      updateCartAttributes(checkout.data.id, getTeamError ? [] : [{ key: 'teamId', value: getTeamData.getTeam.id }]);
      checkoutId.current = checkout.data.id;
    }
  }, [getTeamData, getTeamError, checkout.data, updateCartAttributes]);

  return (
    <ChakraProvider theme={storeTheme}>
      <Flex direction="column" minHeight="100vh">
        <Navbar loading={getTeamLoading} error={getTeamError} data={getTeamData} />
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
