import React from 'react';
import { useSelector } from 'react-redux';
import DashboardNoTeam from './DashboardNoTeam/DashboardNoTeam';

import DashboardTeam from './DashboardTeam/DashboardTeam';

const Dashboard = ({ team }) => {
  const {
    user: { userId },
  } = useSelector(state => state.auth);

  return team ? <DashboardTeam team={team} /> : <DashboardNoTeam userId={userId} />;
};

export default Dashboard;
