import React from 'react';
import { useSelector } from 'react-redux';
import DashboardNoTeam from './DashboardNoTeam/DashboardNoTeam';

import DashboardTeam from './DashboardTeam/DashboardTeam';

const Dashboard = () => {
  const {
    user: { userId, teamId },
  } = useSelector(state => state.auth);

  return teamId ? <DashboardTeam teamId={teamId} /> : <DashboardNoTeam userId={userId} />;
};

export default Dashboard;
