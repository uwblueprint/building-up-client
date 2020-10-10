import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreFront from '../pages/Storefront/Storefront';
import Home from '../pages/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/store/:id" component={StoreFront} />
            <Route path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
};

export default App;
