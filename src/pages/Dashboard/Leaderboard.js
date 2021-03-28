import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, VStack, Heading, Text, Table, Tr, Td, Th, Thead, Tbody, Spinner, Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GET_GLOBAL_LEADERBOARD } from "../../data/gql/team"


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
    <Tr borderBottomWidth={borderBottomWidth} borderColor="white" bg={bgColor} height="88px">
      <Td>
        {rank <= 3 ? (
          <Text fontSize="40px">
            <span role="img" aria-label={`${rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze'} medal`}>
              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
            </span>
          </Text>
        ) : (
          <Text opacity="0.5" paddingLeft="6px">
            {rank}
          </Text>
        )}
      </Td>
      <Td>
        <Heading size="h4">{teamName}</Heading>
      </Td>
      <Td>
        <Text>{affiliation}</Text>
      </Td>
      <Td fontWeight="semibold">{itemsSold}</Td>
    </Tr>
  );
};

const composeTableBody = (row, i) => {
  const { id, name, organization, itemsSold } = row;
  const colors = ['#FFF9DA', '#FAF7F9', '#FFF2E7'];
  return (
    <TableRow
      bgColor={i < 3 ? colors[i] : 'background.primary'}
      borderBottomWidth={i < 3 ? '15px' : '0px'}
      rank={i + 1}
      teamName={name}
      affiliation={organization}
      itemsSold={itemsSold}
      key={id}
    />
  );
};

// Base leaderboard page
const Leaderboard = () => {
  const {
    user: { teamId },
    team,
  } = useSelector(state => state.auth);
  const { data: teamData } = team;

  const { loading, error, data: leaderboardData } = useQuery(GET_GLOBAL_LEADERBOARD);
  if (loading)
    return (
      <Center h="100%">
        <Spinner size="xl" />
        Loading...
      </Center>
    );
  if (error) return `Error! ${error.message}`;

  const headers = ['RANK', 'TEAM NAME', 'AFFILIATION', 'AMOUNT RAISED'];

  return teamData ? (
    <Box>
      <Flex justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Heading textTransform="uppercase" as="p" size="subtitle" color="black" opacity="0.5" mb="8px">
            Team {teamData.teamName}
          </Heading>
          <Heading as="h1" size="h1">
            Leaderboard
          </Heading>
        </VStack>
        <VStack alignItems="flex-end">
          <Text>YOUR RANK</Text>
          <Heading as="h1" size="h1">
            {leaderboardData.getGlobalLeaderboard.findIndex(obj => {
              return obj.id === teamId;
            }) + 1}
          </Heading>
        </VStack>
      </Flex>
      <Table maxHeight="100vh" size="lg">
        <Thead>
          <Tr>{headers.map(composeTableHeader)}</Tr>
        </Thead>
        <Tbody>{leaderboardData.getGlobalLeaderboard.map(composeTableBody)}</Tbody>
      </Table>
    </Box>
  ) : (
    <Redirect to="/" />
  );
};

export default Leaderboard;
