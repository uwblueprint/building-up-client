import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Flex, VStack, Heading, Text, Table, Tr, Td, Th, Thead, Tbody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const GET_GLOBAL_LEADERBOARD = gql`
  query getGlobalLeaderboard {
    getGlobalLeaderboard {
      id
      name
      organization
      itemsSold
    }
  }
`;

const composeTableHeader = (header, i) => {
  return <Th bgColor="white" key={i}>{header}</Th>;
};

const composeTableBody = (row, i) => {
  const { id, name, organization, itemsSold } = row;
  if (i < 3) {
    return (
      <Tr key={id} borderBottomWidth="10px" borderColor="white">
        <Td>
          <Text opacity="0.5">{i}</Text>
        </Td>
        <Td>
          <Heading size="h4">{name}</Heading>
        </Td>
        <Td>{organization}</Td>
        <Td fontWeight="semibold">{itemsSold}</Td>
      </Tr>
    );
  } else {
    return (
      <Tr key={id}>
        <Td>
          <Text opacity="0.5">{i}</Text>
        </Td>
        <Td>
          <Heading size="h4">{name}</Heading>
        </Td>
        <Td>{organization}</Td>
        <Td fontWeight="semibold">{itemsSold}</Td>
      </Tr>
    );
  }
};

// Base leaderboard page
const Leaderboard = () => {
  const {
    user: { teamId },
    team,
  } = useSelector(state => state.auth);

  const { loading, error, data } = useQuery(GET_GLOBAL_LEADERBOARD);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const headers = ["RANK", "TEAM NAME", "AFFILIATION", "ITEMS SOLD"];

  return (
    <Box>
      {(team && (
        <Flex justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Text>{team.teamName}</Text>
            <Heading as="h1" size="h1">
              Leaderboard
            </Heading>
          </VStack>
          <VStack alignItems="flex-end">
            <Text>YOUR RANK</Text>
            <Heading as="h1" size="h1">
              {data.getGlobalLeaderboard.findIndex(obj => {
                return obj.id === teamId;
              }) + 1}
            </Heading>
          </VStack>
        </Flex>
      )) || (
        <Flex justifyContent="space-between">
          <Heading as="h1" size="h1">
            Leaderboard
          </Heading>
        </Flex>
      )}
      <Table maxHeight="100vh">
        <Thead>
          <Tr>{headers.map(composeTableHeader)}</Tr>
        </Thead>
        <Tbody>{data.getGlobalLeaderboard.map(composeTableBody)}</Tbody>
      </Table>
    </Box>
  );
};

export default Leaderboard;
