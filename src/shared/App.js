import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';

import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';

import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import StorefrontRouter from '../components/storefront/StorefrontRouter/StorefrontRouter';
import DashboardRouter, { DASHBOARD_ROOT_PATH } from 'components/dashboard/DashboardRouter/DashboardRouter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* pages with Chakra components, helpful to reference when developing */}
        {__DEV__ && [
          <Route exact path="/chakraExpoDashboard" key="/chakraExpoDashboard">
            <ChakraProvider theme={dashboardTheme}>
              <ChakraExpoDashboard />
            </ChakraProvider>
          </Route>,
          <Route exact path="/chakraExpoStore" key="/chakraExpoStore">
            <ChakraProvider theme={storeTheme}>
              <ChakraExpoStore />
            </ChakraProvider>
          </Route>,
        ]}
        {/* All store pages are controlled by StorefrontRouter */}
        <Route path="/store">
          <StorefrontRouter />
        </Route>
        {/* All dashboard pages are controlled by DashboardRouter */}
        <Route path={`${DASHBOARD_ROOT_PATH}`}>
          <DashboardRouter />
        </Route>
        <Route path="/">
          <Redirect to="/store" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
