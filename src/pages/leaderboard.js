import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_GLOBAL_LEADERBOARD = gql`
  query getGlobalLeaderboard($first: Int!, $offset: Int!) {
    getGlobalLeaderboard(first: $first, offset: $offset) {
      sortedTeams {
        id: teamId
        name: teamName
        itemsSold: score
      }
    }
  }
`;
// Base leaderboard page

const Leaderboard = () => {
  const { loading, err, data } = useQuery(GET_GLOBAL_LEADERBOARD, {
    variables: { first: 0, offset: 10 },
  });
  if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}`;
  return (
    <Fragment>
      <h1>This is the Leaderboard page</h1>
      <h2>This is the data: {JSON.stringify(data.getGlobalLeaderboard.sortedTeams)}</h2>
    </Fragment>
  );
};

export default Leaderboard;
