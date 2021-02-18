import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ChakraProvider, Flex, Grid, Spinner } from '@chakra-ui/react';

import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import dashboardTheme from '../themes/dashboard';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { currentUser } from '../data/actions/auth';
import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';

// const GET_TEAMS = gql`
//   query {
//     getAllTeams {
//       id
//     }
//   }
// `;

function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const { authenticating, user } = useSelector(state => state.auth);

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
            {/* TODO: The login and register should be combined to a single path as per the design */}
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/chakraExpo">
              <ChakraProvider theme={dashboardTheme}>
                <ChakraExpoDashboard />
              </ChakraProvider>
            </Route>
            <ProtectedRoute path="/">
              <Grid templateColumns="280px 1fr" h="100vh">
                {/* All styles here are temporary */}
                <Box borderRight="2px solid black" w="100%" h="100%">
                  Navbar Goes Here
                </Box>

                <Flex w="100%" h="100%" p="72px">
                  <Switch>
                    <ProtectedRoute exact path="/home">
                      <Dashboard />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/leaderboard">
                      Leaderboard page
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/team">
                      Team page
                    </ProtectedRoute>
                    {/* All other paths are redirected to /home */}
                    <ProtectedRoute path="/">
                      <Redirect to="/home" />
                    </ProtectedRoute>
                  </Switch>
                </Flex>
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
