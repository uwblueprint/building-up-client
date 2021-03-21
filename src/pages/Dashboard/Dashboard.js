import React from 'react';
import { useSelector } from 'react-redux';
import DashboardNoTeam from './DashboardNoTeam/DashboardNoTeam';

import DashboardTeam from './DashboardTeam/DashboardTeam';

const Dashboard = () => {
  const {
    user: { userId },
    team,
  } = useSelector(state => state.auth);

  return team ? <DashboardTeam /> : <DashboardNoTeam userId={userId} />;
};

export default Dashboard;
