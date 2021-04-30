import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { Box, Center, ChakraProvider, Grid, Spinner } from '@chakra-ui/react';

import dashboardTheme from 'themes/dashboard';

import { currentUser, teamInfo, noTeamInfo } from 'data/actions/auth';

import Dashboard from 'pages/Dashboard/Dashboard';
import Invite from 'pages/Invite/Invite';
import Leaderboard from 'pages/Leaderboard/Leaderboard';
import LoginRegister from 'pages/LoginRegister/LoginRegister';
import TeamOverview from 'pages/TeamOverview/TeamOverview';
import EmailVerify from 'pages/EmailVerify/EmailVerify';
import ResetPassword from 'pages/ResetPassword/ResetPassword';

import PageContainer from '../PageContainer/PageContainer';
import Navbar, { NAVBAR_WIDTH } from '../Navbar/Navbar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export const DASHBOARD_ROOT_PATH = '/dashboard';

const DashboardRouter = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const { authenticating, user, team } = useSelector(state => state.auth);
  const { loading: teamLoading, data: teamData } = team;

  // Try to login the user on app init
  useEffect(() => {
    dispatch(currentUser(client));
  }, [dispatch, client]);

  // Update the current team info when the user changes
  useEffect(() => {
    if (user && user.teamId) {
      dispatch(teamInfo(user.teamId, client));
    } else if (user && !user.teamId) {
      dispatch(noTeamInfo());
    }
  }, [user, dispatch, client]);

  return (
    <ChakraProvider theme={dashboardTheme}>
      {authenticating ? (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Switch>
          {/* ProtectedRoute will redirect to /login if not signed in
          It also sets location.state.from
          After signing in, redirect to the original path 
          */}
          <Route exact path={`${DASHBOARD_ROOT_PATH}/login`}>
            <LoginRegister />
          </Route>
          <Route exact path={`${DASHBOARD_ROOT_PATH}/resetPassword/:token`}>
            <ResetPassword />
          </Route>
          <ProtectedRoute disableEmailVerify path={`${DASHBOARD_ROOT_PATH}`}>
            <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} templateRows="100vh" h="100vh">
              <Box borderRight="2px solid black" w="100%" h="100%">
                {/** Navbar width is set manually to keep the position fixed */}
                <Navbar />
              </Box>
              <Box w="100%" h="100%">
                {teamLoading ? (
                  <Center h="100%">
                    <Spinner size="xl" />
                  </Center>
                ) : (
                  <PageContainer>
                    <InnerRouter teamData={teamData} />
                  </PageContainer>
                )}
              </Box>
            </Grid>
          </ProtectedRoute>
        </Switch>
      )}
    </ChakraProvider>
  );
};

export const InnerRouter = ({ teamData }) => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <ProtectedRoute disableEmailVerify exact path={`${path}/verify/:hash`}>
        <EmailVerify />
      </ProtectedRoute>
      <ProtectedRoute exact path={`${path}/invite/:teamId`}>
        <Invite />
      </ProtectedRoute>
      <ProtectedRoute path={`${path}`}>
        <Switch>
          <ProtectedRoute exact path={`${path}/home`}>
            <Dashboard team={teamData} />
          </ProtectedRoute>
          {teamData && (
            <ProtectedRoute exact path={`${path}/leaderboard`}>
              <Leaderboard team={teamData} />
            </ProtectedRoute>
          )}
          {teamData && (
            <ProtectedRoute exact path={`${path}/team`}>
              <TeamOverview team={teamData} />
            </ProtectedRoute>
          )}
          {/* /dashboard/** that's doesn't match redirect to /dashboard/home */}
          <Route path="/">
            <Redirect to={`${path}/home`} />
          </Route>
        </Switch>
      </ProtectedRoute>
    </Switch>
  );
};

export default DashboardRouter;
