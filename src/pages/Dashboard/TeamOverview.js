import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Center, Flex, Heading, Spacer } from '@chakra-ui/react';

const GET_TEAM_INFO = gql`
  query getTeam($id: Int!) {
    getTeam(id: $id) {
      name
      organization
      id
      amountRaised
      itemsSold
    }
  }
`;

const StorefrontButton = () => {
  return <Button w="199px">Share Storefront</Button>;
};

const SalesInfo = props => {
  return (
    <Box mr="100px">
      <Heading textTransform="uppercase" size="subtitle" color="gray.500" mb="8px">
        {props.description}
      </Heading>
      <Heading size="h2">{props.amount}</Heading>
    </Box>
  );
};

const NoSales = () => {
  return (
    <Box w="100%" h="300px" bg="background.primary">
      <Center w="100%">
        <Heading size="h4" mt="69px" mb="24px">
          You don’t have sales yet. Share your storelink to get started!
        </Heading>
      </Center>
      <Center w="100%">
        <StorefrontButton />
      </Center>
    </Box>
  );
};

const TeamOverview = ({ teamId }) => {
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id: teamId },
  });

  return loading ? (
    'Loading...'
  ) : error ? (
    `Error! ${error.message}`
  ) : (
    <Box w="100%">
      <Heading textTransform="uppercase" size="subtitle" color="gray.500" mb="8px">
        Team {data.getTeam.name}
      </Heading>
      <Flex mb="40px">
        <Heading size="h1">Dashboard</Heading>
        <Spacer />
        {data.getTeam.itemsSold !== 0 ? <StorefrontButton /> : null}
      </Flex>
      <Heading size="h3" mb="23px">
        Overview
      </Heading>
      <Flex mb="72px">
        <SalesInfo description="Total Items Sold" amount={data.getTeam.itemsSold} />
        <SalesInfo description="Total Capital Raised" amount={'$' + data.getTeam.amountRaised} />
      </Flex>
      <Heading size="h3" mb="21px">
        Sales Log
      </Heading>
      {data.getTeam.itemsSold === 0 ? <NoSales /> : null}
    </Box>
  );
};

export default TeamOverview;
