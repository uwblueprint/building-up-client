import React from 'react';
import { useSelector } from 'react-redux';

import TeamOverview from './DashboardTeam/DashboardTeam';

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

export default Dashboard;
