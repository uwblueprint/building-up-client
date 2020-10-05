import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreFront from "../pages/storefront";
import Home from "../pages/home";
import Payment from "../pages/payment";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/payment" component={Payment} />
            <Route path="/store/:id" component={StoreFront} />
            <Route path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
