import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GET_ALL_TEAMS } from 'data/gql/team';
import { useQuery } from '@apollo/client';

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
  const { error: getAllTeamsError, data: getAllTeamsData } = useQuery(GET_ALL_TEAMS);
  const [teamIdIsValid, setTeamIdIsValid] = useState(false);
  const [loadingTeamId, setLoadingTeamId] = useState(true);
  const [teamName, setTeamName] = useState('');
  useEffect(() => {
    if (getAllTeamsData) {
      const queries = new URLSearchParams(window.location.search);
      const teamId = queries.get('team');
      const match = getAllTeamsData.getAllTeams.filter(team => team.id === teamId);
      if (match.length !== 0) setTeamName(match[0].name);
      setTeamIdIsValid(match.length !== 0);
      setLoadingTeamId(false);
    } else if (getAllTeamsError) {
      setTeamIdIsValid(false);
      setLoadingTeamId(false);
    }
  }, [getAllTeamsError, getAllTeamsData]);

  return (
    <ChakraProvider theme={storeTheme}>
      <Navbar />
      <TeamBanner
        isLoading={loadingTeamId}
        isValidTeam={teamIdIsValid}
        bannerText={
          loadingTeamId
            ? 'Loading...'
            : teamIdIsValid
            ? teamName
            : 'Please note that your purchase will not be attributed to a team'
        }
      />
      <BestSellers />
      <ItemListings />
      <Footer />
    </ChakraProvider>
  );
};

export default Store;
