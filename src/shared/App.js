import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import dashboardTheme from '../themes/dashboard';
import storeTheme from '../themes/store';

import ChakraExpoDashboard from '../themes/dashboard/ChakraExpoDashboard';
import ChakraExpoStore from '../themes/store/ChakraExpoStore';
import StorefrontRouter from '../components/storefront/StorefrontRouter/StorefrontRouter';
import DashboardRouter from 'components/dashboard/DashboardRouter/DashboardRouter';

function App() {
  return (
    <BrowserRouter>
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

        {/* All store pages are controlled by StorefrontRouter */}
        <Route path="/store">
          <StorefrontRouter />
        </Route>
        {/* All dashboard pages are controlled by DashboardRouter */}
        <Route path="/">
          <DashboardRouter />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
