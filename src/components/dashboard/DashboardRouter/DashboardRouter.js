import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { Box, Center, ChakraProvider, Grid, Spinner } from '@chakra-ui/react';

import dashboardTheme from 'themes/dashboard';

import Dashboard from 'pages/Dashboard/Dashboard';
import Invite from 'pages/Invite/Invite';
import LoginRegister from 'pages/LoginRegister/LoginRegister';
import TeamView from 'pages/TeamView/TeamView';

import Navbar, { NAVBAR_WIDTH } from '../Navbar/Navbar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const DashboardRouter = () => {
  const { authenticating, user } = useSelector(state => state.auth);
  const location = useLocation();

  return (
    <ChakraProvider theme={dashboardTheme}>
      {/* Show spinner while authenticating */}
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
          <Route exact path="/login">
            {user ? <Redirect to={location.state?.from?.pathname ?? '/'} /> : <LoginRegister />}
          </Route>
          <ProtectedRoute path="/">
            <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} h="100vh">
              <Box borderRight="2px solid black" w="100%" h="100%">
                {/** Navbar width is set manually to keep the position fixed */}
                <Navbar />
              </Box>
              <Box w="100%" h="100%" p="72px">
                <Switch>
                  <ProtectedRoute exact path="/home">
                    <Dashboard />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/leaderboard">
                    Leaderboard page, not yet implemented.
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/team">
                    <TeamView />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/invite/:teamId">
                    <Invite />
                  </ProtectedRoute>
                  {/* All other paths are redirected to /home */}
                  <ProtectedRoute path="/">
                    <Redirect to="/home" />
                  </ProtectedRoute>
                </Switch>
              </Box>
            </Grid>
          </ProtectedRoute>
        </Switch>
      )}
    </ChakraProvider>
  );
};

export default DashboardRouter;
