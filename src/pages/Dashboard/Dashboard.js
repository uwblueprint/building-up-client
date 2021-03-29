import React from 'react';
import { useSelector } from 'react-redux';
import { Center, Spinner } from '@chakra-ui/react';
import DashboardNoTeam from './DashboardNoTeam/DashboardNoTeam';

import DashboardTeam from './DashboardTeam/DashboardTeam';

const Dashboard = () => {
  const {
    user: { userId },
    team,
  } = useSelector(state => state.auth);

  const { loading, data } = team;

  return loading ? (
    <Center h="100%">
      <Spinner size="xl" />
    </Center>
  ) : data ? (
    <DashboardTeam />
  ) : (
    <DashboardNoTeam userId={userId} />
  );
};

export default Dashboard;
