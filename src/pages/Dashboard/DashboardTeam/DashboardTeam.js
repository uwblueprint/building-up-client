import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Center, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';

const GET_TEAM_INFO = gql`
  query getTeam($id: String!) {
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
    <Box>
      <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
        {props.description}
      </Heading>
      <Heading as="h2" size="h2">
        {props.amount}
      </Heading>
    </Box>
  );
};

const NoSales = () => {
  return (
    <Box w="100%" h="300px" bg="background.primary">
      <Center w="100%">
        <Heading as="h4" size="h4" mt="69px" mb="24px">
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
      <Heading textTransform="uppercase" as="p" size="subtitle" color="gray.500" mb="8px">
        Team {data.getTeam.name}
      </Heading>
      <Flex mb="40px">
        <Heading as="h1" size="h1">
          Dashboard
        </Heading>
        <Spacer />
        {data.getTeam.itemsSold !== 0 ? <StorefrontButton /> : null}
      </Flex>
      <Heading as="h3" size="h3" mb="23px">
        Overview
      </Heading>
      <HStack mb="72px" spacing="100px">
        <SalesInfo description="Total Items Sold" amount={data.getTeam.itemsSold} />
        <SalesInfo description="Total Capital Raised" amount={'$' + data.getTeam.amountRaised} />
      </HStack>
      <Heading as="h3" size="h3" mb="21px">
        Sales Log
      </Heading>
      {data.getTeam.itemsSold === 0 ? <NoSales /> : null}
    </Box>
  );
};

export default TeamOverview;