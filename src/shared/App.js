import React from 'react';
import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StoreFront from '../pages/storefront'
import Home from '../pages/home'

const GET_TEAMS = gql`
  query {
    getAllTeams {
      id
    }
}
`

function App() {
  const { loading, error, data } = useQuery(GET_TEAMS)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Switch>
            {data.getAllTeams.map(team => {
              console.log("The team", team)
              return <Route exact path="/store/:id" component={StoreFront}>{team}</Route>
            })}
            <Route path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
