import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Center, Spacer, Heading } from '@chakra-ui/react';

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

const SalesInfo = props => {
  return (
    <Box mr="100px">
      <Heading fontSize="h4" color="gray.400" mb="8px">
        {props.description}
      </Heading>
      <Heading fontSize="32px">{props.amount}</Heading>
    </Box>
  );
};

const StorefrontButton = () => {
  return <Button w="199px">Share Storefront</Button>;
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
      <Heading fontSize="h4" color="gray.400" mb="8px">
        Team {data.getTeam.name}
      </Heading>
      <Box d="flex" mb="40px">
        <Heading fontSize="36px">Dashboard</Heading>
        <Spacer />
        {data.getTeam.itemsSold !== 0 ? <StorefrontButton /> : null}
      </Box>
      <Heading fontSize="24px" mb="23px">
        Overview
      </Heading>
      <Box d="flex" mb="72px">
        <SalesInfo description="TOTAL ITEMS SOLD" amount={data.getTeam.itemsSold} />
        <SalesInfo description="TOTAL CAPITAL RAISED" amount={'$' + data.getTeam.amountRaised} />
      </Box>
      <Heading fontSize="24px" mb="21px">
        Sales Log
      </Heading>
      {data.getTeam.itemsSold === 0 ? (
        <Box w="100%" h="300px" bg="background.primary">
          <Center w="100%">
            <Heading fontSize="20px" mt="69px" mb="24px">
              You don’t have sales yet. Share your storelink to get started!
            </Heading>
          </Center>
          <Center w="100%">
            <StorefrontButton />
          </Center>
        </Box>
      ) : null}
    </Box>
  );
};

export default TeamOverview;
