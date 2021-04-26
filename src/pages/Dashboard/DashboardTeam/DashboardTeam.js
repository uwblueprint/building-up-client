import React from 'react';
import { Box, Center, Flex, Heading, HStack } from '@chakra-ui/react';

import PageHeading from 'components/dashboard/PageHeading/PageHeading';
import ShareStorefrontButton from 'components/dashboard/ShareStorefrontButton/ShareStorefrontButton';
import SalesLogTable from './SalesLogTable';

import { useQuery } from '@apollo/client';
import { GET_LATEST_ORDERS } from '../../../data/gql/team';

const StorefrontButton = () => {
  return (
    <Box w="199px">
      <ShareStorefrontButton>Share Storefront</ShareStorefrontButton>
    </Box>
  );
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

const DashboardTeam = ({ team }) => {
  const { loading, error, data } = useQuery(GET_LATEST_ORDERS, {
    variables: { id: team.teamId },
  });

  return (
    <>
      <Flex w="100%" justify="space-between">
        <PageHeading teamName={team.teamName} title="Dashboard" />
        {team.itemsSold !== 0 && (
          <Box alignSelf="flex-end">
            <StorefrontButton />
          </Box>
        )}
      </Flex>
      <Box mb="32px">
        <Heading as="h3" size="h3" mb="23px">
          Overview
        </Heading>
        <HStack spacing="100px">
          <SalesInfo description="Total Items Sold" amount={team.itemsSold} />
          <SalesInfo description="Total Capital Raised" amount={`$${team.amountRaised.toFixed(2)}`} />
        </HStack>
      </Box>
      <Box w="100%">
        <Heading as="h3" size="h3" mb="21px">
          Sales Log
        </Heading>
        {team.itemsSold === 0 ? (
          <NoSales />
        ) : error ? (
          `Error! ${error.message}`
        ) : (
          <SalesLogTable loading={loading} data={data} />
        )}
      </Box>
    </>
  );
};

export default DashboardTeam;
