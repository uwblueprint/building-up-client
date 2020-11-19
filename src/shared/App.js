import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamDashboard from '../pages/TeamDashboard/teamdashboard';
import Home from '../pages/home';
import StoreFront from '../pages/Storefront/storefront';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import Product from '../pages/Product/product';
import Cart from '../pages/Cart/cart';
import { useShopify } from '../hooks/useShopify';

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

  useEffect(() => {
    createShop();
    fetchProducts();
    //createCheckout();
  }, [createShop, fetchProducts, createCheckout]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {data.getAllTeams.map((team, i) => {
              console.log('The team', team);
              return (
                <React.Fragment key={i}>
                  <Route exact path="/:id/store" component={StoreFront} />
                  <Route exact path="/:id/cart" component={Cart} />
                  <Route exact path="/:id/store/:productId" component={Product} />
                  <Route exact path="/:id/home" component={TeamDashboard} />
                </React.Fragment>
              );
            })}
          </Switch>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
