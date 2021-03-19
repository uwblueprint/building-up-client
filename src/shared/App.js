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
import Navbar from '../components/dashboard/Navbar/Navbar';
import Store from '../pages/Storefront/store';
import Footer from '../components/Storefront/Footer';

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
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <LoginRegister />}
            </Route>
            <Route exact path="/chakraExpoDashboard">
              <ChakraProvider theme={dashboardTheme}>
                <ChakraExpoDashboard />
              </ChakraProvider>
            </Route>
            <Route exact path="/chakraExpoStore">
              <ChakraProvider theme={storeTheme}>
                <ChakraExpoStore />
              </ChakraProvider>
            </Route>
            <Route exact path="/footer">
              <ChakraProvider theme={storeTheme}>
                <Footer />
              </ChakraProvider>
            </Route>
            <Route exact path="/store">
              <Store />
            </Route>
            <ProtectedRoute path="/">
              <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} h="100vh">
                <Box borderRight="2px solid black" w="100%" h="100%">
                  {/** Navbar width is set manually to keep the position fixed */}
                  <Navbar w={NAVBAR_WIDTH} />
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
