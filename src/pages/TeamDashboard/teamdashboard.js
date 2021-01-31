import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const GET_TEAM_INFO = gql`
  query getTeam($id: Int!) {
    getTeam(id: $id) {
      name
      organization
      id
    }
  }
`;

const TeamDashboard = props => {
  const id = Number(props.match.params.id);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id },
  });
  console.log('This is the team data: ', data);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (isLoggedIn) {
    return (
      <Fragment>
        <h1>This is the Team Dashboard page</h1>
        <h2>The Team Using this has ID {id}</h2>
        <h2>This is their data: {JSON.stringify(data.getTeam)}</h2>
      </Fragment>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default TeamDashboard;
