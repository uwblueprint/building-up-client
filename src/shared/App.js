import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ChakraProvider, Flex, Grid, Spinner } from '@chakra-ui/react';

import Dashboard from '../pages/Dashboard/Dashboard';
import LoginRegister from '../pages/LoginRegister/LoginRegister';
import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';
import TeamView from '../pages/TeamView/TeamView';

import ProtectedRoute from '../components/dashboard/ProtectedRoute/ProtectedRoute';
import { currentUser } from '../data/actions/auth';
import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import Navbar from '../components/dashboard/Navbar/Navbar';
import Store from '../pages/Storefront/Storefront';
import Invite from '../pages/Invite';
import Footer from '../components/Storefront/Footer/Footer';

function App() {
  const [redirectPath, setRedirectPath] = useState('/');
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
        <Switch>
          <Route exact path="/login">
            {user ? <Redirect to={redirectPath} /> : <LoginRegister />}
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
          <ProtectedRoute setRedirect={setRedirectPath} path="/">
            <Grid templateColumns={`${NAVBAR_WIDTH} 1fr`} h="100vh">
              <Box borderRight="2px solid black" w="100%" h="100%">
                {/** Navbar width is set manually to keep the position fixed */}
                <Navbar w={NAVBAR_WIDTH} />
              </Box>

              <Box w="100%" h="100%" p="72px">
                <Switch>
                  <ProtectedRoute setRedirect={setRedirectPath} exact path="/home">
                    <Dashboard />
                  </ProtectedRoute>
                  <ProtectedRoute setRedirect={setRedirectPath} exact path="/leaderboard">
                    Leaderboard page, not yet implemented.
                  </ProtectedRoute>
                  <ProtectedRoute setRedirect={setRedirectPath} exact path="/team">
                    <TeamView />
                  </ProtectedRoute>
                  <ProtectedRoute setRedirect={setRedirectPath} exact path="/invite/:teamId">
                    <Invite />
                  </ProtectedRoute>
                  {/* All other paths are redirected to /home */}
                  <ProtectedRoute setRedirect={setRedirectPath} path="/">
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
