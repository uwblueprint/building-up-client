import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, ChakraProvider, Flex, Grid, Spinner } from '@chakra-ui/react';

import Dashboard from '../pages/Dashboard/Dashboard';
import LoginRegister from '../pages/LoginRegister/LoginRegister';
import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';
import TeamView from '../pages/TeamView/TeamView';

import ProtectedRoute from '../components/dashboard/ProtectedRoute/ProtectedRoute';
import { currentUser, teamInfo, noTeamInfo } from '../data/actions/auth';
import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import Navbar from '../components/dashboard/Navbar/Navbar';
import Storefront from '../pages/Storefront/Storefront';
import Leaderboard from '../pages/Dashboard/Leaderboard';

function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { authenticating, user, team } = useSelector(state => state.auth);
  const { loading: teamLoading } = team;

  const NAVBAR_WIDTH = '280px';

  useEffect(() => {
    dispatch(currentUser(client));
  }, [dispatch, client]);

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
        <Flex direction="column" alignItems="center">
          <div>Authenticating... </div>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <LoginRegister />}
            </Route>
            <Route exact path="/chakraExpoDashboard">
              <ChakraExpoDashboard />
            </Route>
            <Route exact path="/chakraExpoStore">
              <ChakraProvider theme={storeTheme}>
                <ChakraExpoStore />
              </ChakraProvider>
            </Route>
            <Route exact path="/store">
              <Storefront />
            </Route>
            <ProtectedRoute path="/">
              <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} h="100vh">
                <Box borderRight="2px solid black" w="100%" h="100%">
                  {/** Navbar width is set manually to keep the position fixed */}
                  <Navbar w={NAVBAR_WIDTH} />
                </Box>

                <Box w="100%" h="100%" p="72px">
                  {teamLoading ? (
                    <Center h="100%">
                      <Spinner size="xl" />
                    </Center>
                  ) : (
                    <Switch>
                      <ProtectedRoute exact path="/home">
                        <Dashboard />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/leaderboard">
                        <Leaderboard />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/team">
                        <TeamView />
                      </ProtectedRoute>
                      {/* All other paths are redirected to /home */}
                      <ProtectedRoute path="/">
                        <Redirect to="/home" />
                      </ProtectedRoute>
                    </Switch>
                  )}
                </Box>
              </Grid>
            </ProtectedRoute>
          </Switch>
        </Router>
      )}
    </ChakraProvider>
  );

  /* Old code
  
  We can think about how to structure the storefront in the future (as a separate app, or in a top-level Route path="/store")
  */

  /* {data.getAllTeams.map((team, i) => {
          console.log('The team', team);
          return (
            <React.Fragment key={i}>
              <ChakraProvider theme={storeTheme}>
                <Route exact path="/:id/store" component={StoreFront} />
                <Route exact path="/:id/cart" component={Cart} />
                <Route exact path="/:id/store/:productId" component={Product} />
              </ChakraProvider>

              <ChakraProvider theme={dashboardTheme}>
                <Route exact path="/:id/home" component={TeamDashboard} />
              </ChakraProvider>
            </React.Fragment>
          );
        })} 
  */
}

export default App;
