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
  return (
    <Th bgColor="white" key={i}>
      <Heading textTransform="uppercase" as="p" size="subtitle" color="black" opacity="0.5" mb="8px">
        {header}
      </Heading>
    </Th>
  );
};

const TableRow = props => {
  const { bgColor, borderBottomWidth, rank, teamName, affiliation, itemsSold } = props;
  return (
    <Tr key={rank} borderBottomWidth={borderBottomWidth} borderColor="white" bg={bgColor} height="88px">
      <Td>
        {(rank === 1 && (
          <Text fontSize="40px">
            <span role="img" aria-label="gold medal">
              🥇
            </span>
          </Text>
        )) ||
          (rank === 2 && (
            <Text fontSize="40px">
              <span role="img" aria-label="gold medal">
                🥈
              </span>
            </Text>
          )) ||
          (rank === 3 && (
            <Text fontSize="40px">
              <span role="img" aria-label="gold medal">
                🥉
              </span>
            </Text>
          )) || (
            <Text opacity="0.5" paddingLeft="6px">
              {rank}
            </Text>
          )}
      </Td>
      <Td>
        <Heading size="h4">{teamName}</Heading>
      </Td>
      <Td>
        <Text size="body">{affiliation}</Text>
      </Td>
      <Td fontWeight="semibold">{itemsSold}</Td>
    </Tr>
  );
};

const composeTableBody = (row, i) => {
  const { name, organization, itemsSold } = row;
  const colors = ['#FFF9DA', '#FAF7F9', '#FFF2E7'];
  return (
    <TableRow
      bgColor={i < 3 ? colors[i] : '#FAFAFA'}
      borderBottomWidth={i < 3 ? '15px' : '0px'}
      rank={i + 1}
      teamName={name}
      affiliation={organization}
      itemsSold={itemsSold}
    />
  );
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

  const headers = ['RANK', 'TEAM NAME', 'AFFILIATION', 'ITEMS SOLD'];

  return (
    <Box>
      {(team && (
        <Flex justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Heading textTransform="uppercase" as="p" size="subtitle" color="black" opacity="0.5" mb="8px">
              Team {team.teamName}
            </Heading>
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
      <Table maxHeight="100vh" size="lg">
        <Thead>
          <Tr>{headers.map(composeTableHeader)}</Tr>
        </Thead>
        <Tbody>{data.getGlobalLeaderboard.map(composeTableBody)}</Tbody>
      </Table>
    </Box>
  );
};

export default Leaderboard;
