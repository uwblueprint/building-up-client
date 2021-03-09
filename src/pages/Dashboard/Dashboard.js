import React from 'react';
import { useSelector } from 'react-redux';
import NoTeamRegistration from './NoTeamRegistration';

import TeamOverview from './DashboardTeam/DashboardTeam';

const Dashboard = () => {
  const {
    user: { userId, teamId },
  } = useSelector(state => state.auth);

  return teamId ? <TeamOverview teamId={teamId} /> : <NoTeamRegistration userId={userId} />;
};

export default Dashboard;
