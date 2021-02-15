import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';

const GET_TEAM_INFO = gql`
  query getTeam($id: Int!) {
    getTeam(id: $id) {
      name
      organization
      id
    }
  }
`;

const Dashboard = () => {
  const {
    user: { teamId },
  } = useSelector(state => state.auth);

  return teamId ? (
    <TeamOverview teamId={teamId} />
  ) : (
    <div>
      <h1>Welcome</h1>
      {'User is not part of a team (todo: implement this view)'}
    </div>
  );
};

// This should probably be abstracted into a separate component
const TeamOverview = ({ teamId }) => {
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id: teamId },
  });

  // Fetch other info as necessary and show team info...

  return loading ? (
    'Loading...'
  ) : error ? (
    `Error! ${error.message}`
  ) : (
    <h2>{`Team data: ${JSON.stringify(data.getTeam)}`}</h2>
  );
};

export default Dashboard;
