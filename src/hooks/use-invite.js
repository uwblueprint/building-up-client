import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useLazyQuery } from '@apollo/client';

import { UPDATE_USERS_TEAM } from 'data/actions/type';
import { GET_TEAM_INFO } from 'data/gql/team';
import { JOIN_TEAM } from 'data/gql/user';

/**
 * A hook for managing the state of the invite flow
 *
 * Updates the Redux store after joining a team
 */
const useInvite = () => {
  const dispatch = useDispatch();

  // The mutation to join a team
  const joinTeamMutation = useMutation(JOIN_TEAM);
  const [, { data: joinTeamData }] = joinTeamMutation;

  // The mutation to fetch a team's info
  const getTeamInfoQuery = useLazyQuery(GET_TEAM_INFO);
  const { data: teamData } = getTeamInfoQuery;

  // After joining team, update the Redux store
  React.useEffect(() => {
    if (joinTeamData) {
      const { teamId } = joinTeamData.joinTeam;
      dispatch({ type: UPDATE_USERS_TEAM, payload: teamId });
    }
  }, [joinTeamData, teamData, dispatch]);

  return { joinTeamMutation, getTeamInfoQuery };
};

export default useInvite;
