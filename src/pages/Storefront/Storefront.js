import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GET_ALL_TEAMS } from 'data/gql/team';
import { useQuery } from '@apollo/client';

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
  const { loading, error, data } = useQuery(GET_ALL_TEAMS);
  const [teamIdIsValid, setTeamIdIsValid] = useState(false);
  const [loadingTeamId, setLoadingTeamId] = useState(true);

  useEffect(() => {
    if (data) {
      const queries = new URLSearchParams(window.location.search);
      const teamId = queries.get('team');
      const match = data.getAllTeams.filter(team => team.id === teamId);
      setTeamIdIsValid(match.length !== 0);
      setLoadingTeamId(false);
    }
  }, [data]);

  return (
    <ChakraProvider theme={storeTheme}>
      <Navbar />
      { !loadingTeamId && ((!teamIdIsValid && <div>No team banner</div>) || <div>Valid Team Banner</div>) }
      <BestSellers />
      <ItemListings />
      <Footer />
    </ChakraProvider>
  );
};

export default Store;
