import React, { useEffect } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";

import TeamDashboard from '../pages/TeamDashboard/teamdashboard';
import StoreFront from '../pages/Storefront/storefront';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import { storeTheme, dashboardTheme } from './Themes';
import Product from '../pages/Product/product';
import Cart from '../pages/Cart/cart';
import { useShopify } from '../hooks/useShopify';
import ProtectedRoute from '../pages/protectedroute';
import { currentUser } from '../data/actions/auth';

const GET_TEAMS = gql`
  query {
    getAllTeams {
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TEAMS);
  const { createShop, createCheckout, fetchProducts } = useShopify();

  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    createShop();
    fetchProducts();
    createCheckout();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  dispatch(currentUser(client)); // Fetch user data for Redux (if logged in)

  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={ProtectedRoute} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {data.getAllTeams.map((team, i) => {
            console.log('The team', team);
            return (
              <React.Fragment key={i}>
                <ThemeProvider theme={storeTheme}>
                  <Route exact path="/:id/store" component={StoreFront} />
                  <Route exact path="/:id/cart" component={Cart} />
                  <Route exact path="/:id/store/:productId" component={Product} />
                </ThemeProvider>

                <ThemeProvider theme={dashboardTheme}>
                  <Route exact path="/:id/home" component={TeamDashboard} />
                </ThemeProvider>
              </React.Fragment>
            );
          })}
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
