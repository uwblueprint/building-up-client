import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GET_TEAM_INFO } from 'data/gql/team';
import { useLazyQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { Navbar, BestSellers, ItemListings, Footer, TeamBanner } from 'components/storefront';
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
  const [getTeam, { loading: getTeamLoading, error: getTeamError, data: getTeamData }] = useLazyQuery(GET_TEAM_INFO);
  const { search } = useLocation();
  useEffect(() => {
    if (search) {
      const queries = new URLSearchParams(search);
      const teamId = queries.get('team');
      if (teamId) {
        getTeam({ variables: { id: teamId } });
      }
    }
  }, [search, getTeam]);

  return (
    <ChakraProvider theme={storeTheme}>
      <Navbar />
      <TeamBanner loading={getTeamLoading} error={getTeamError} data={getTeamData} />
      <BestSellers />
      <ItemListings />
      <Footer />
    </ChakraProvider>
  );
};

export default Store;
