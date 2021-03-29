import React from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Flex, Heading, Skeleton, Text, Table, Tr, Td, Th, Thead, Tbody } from '@chakra-ui/react';

import { GET_GLOBAL_LEADERBOARD } from '../../data/gql/team';

import PageHeading from 'components/dashboard/PageHeading/PageHeading';

const headers = ['RANK', 'TEAM NAME', 'AFFILIATION', 'AMOUNT RAISED'];

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
  const { bgColor, borderBottomWidth, rank, teamName, affiliation, amountRaised } = props;
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
      <Td fontWeight="semibold">{amountRaised}</Td>
    </Tr>
  );
};

const composeTableBody = (row, i) => {
  const { id, name, organization, amountRaised } = row;
  const colors = ['#FFF9DA', '#FAF7F9', '#FFF2E7'];
  return (
    <TableRow
      bgColor={i < 3 ? colors[i] : 'background.primary'}
      borderBottomWidth={i < 3 ? '15px' : '0px'}
      rank={i + 1}
      teamName={name}
      affiliation={organization}
      amountRaised={amountRaised}
      key={id}
    />
  );
};

// Base leaderboard page
const Leaderboard = ({ team }) => {
  const {
    user: { teamId },
  } = useSelector(state => state.auth);

  const { loading: leaderboardLoading, error, data: leaderboardData } = useQuery(GET_GLOBAL_LEADERBOARD);

  return (
    <>
      <Flex w="100%" justifyContent="space-between">
        <PageHeading teamName={team.teamName} title="Leaderboard" />

        {leaderboardData && (
          <Flex direction="column" justify="space-between" align="flex-end">
            <Text>YOUR RANK</Text>
            <Heading as="h2" size="h1">
              {leaderboardData.getGlobalLeaderboard.findIndex(obj => {
                return obj.id === teamId;
              }) + 1}
            </Heading>
          </Flex>
        )}
      </Flex>
      <Skeleton height="400px" isLoaded={!leaderboardLoading} w="100%">
        {error ? (
          `Error! ${error.message}`
        ) : (
          <Table maxH="100vh" size="lg">
            <Thead>
              <Tr>{headers.map(composeTableHeader)}</Tr>
            </Thead>
            <Tbody>{leaderboardData?.getGlobalLeaderboard?.map(composeTableBody)}</Tbody>
          </Table>
        )}
      </Skeleton>
    </>
  );
};

export default Leaderboard;
