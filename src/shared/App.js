import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ChakraProvider, Flex, Grid, Spinner } from '@chakra-ui/react';

import Dashboard from '../pages/Dashboard/Dashboard';
import LoginRegister from '../pages/User/LoginRegister';
import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';
import TeamView from '../pages/TeamView/TeamView';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { currentUser } from '../data/actions/auth';
import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import Navbar from '../components/common/dashboard/Navbar';
import Store from '../pages/Storefront/store';

function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { authenticating, user } = useSelector(state => state.auth);

  const NAVBAR_WIDTH = '280px';

  useEffect(() => {
    // Component on mount (i.e. app init): Try to fetch user data (Apollo client internally uses a cookie)
    dispatch(currentUser(client));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Route exact path="/login" render={() => (user ? <Redirect to="/" /> : <LoginRegister />)} />
            <Route exact path="/chakraExpoDashboard" component={ChakraExpoDashboard} />
            <Route
              exact
              path="/chakraExpoStore"
              render={() => (
                <ChakraProvider theme={storeTheme}>
                  <ChakraExpoStore />
                </ChakraProvider>
              )}
            />
            <Route exact path="/store" component={Store} />
            <ProtectedRoute path="/">
              <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} h="100vh">
                <Box borderRight="2px solid black" w="100%" h="100%">
                  {/** Navbar width is set manually to keep the position fixed */}
                  <Navbar w={NAVBAR_WIDTH} />
                </Box>
                <Box w="100%" h="100%" p="72px">
                  <Switch>
                    <ProtectedRoute exact path="/home" component={Dashboard} />
                    <ProtectedRoute exact path="/leaderboard" component={'Leaderboard page, not yet implemented.'} />
                    <ProtectedRoute exact path="/team" component={TeamView} />
                    {/* All other paths are redirected to /home */}
                    <ProtectedRoute path="/">
                      <Redirect to="/home" />
                    </ProtectedRoute>
                  </Switch>
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
