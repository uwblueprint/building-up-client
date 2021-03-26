import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';

import { currentUser } from '../data/actions/auth';
import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import Storefront from '../pages/Storefront/Storefront';
import DashboardRouter from 'components/dashboard/DashboardRouter/DashboardRouter';

function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    // Component on mount (i.e. app init): Try to fetch user data (Apollo client internally uses a cookie)
    dispatch(currentUser(client));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      {/* pages with Chakra components, helpful to reference when developing */}
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

      {/* TODO: put in storefront router */}
      <Route exact path="/store">
        <Storefront />
      </Route>
      {/* All dashboard pages are controlled by DashboardRouter */}
      <Route path="/">
        <DashboardRouter />
      </Route>
    </Switch>
  );
}

export default App;
