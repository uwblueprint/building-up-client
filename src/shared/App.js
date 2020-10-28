import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreFront from '../pages/Storefront/storefront';
import TeamDashboard from '../pages/TeamDashboard/teamdashboard';
import Home from '../pages/home';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';

const GET_TEAMS = gql`
  query {
    getAllTeams {
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TEAMS);
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
                   {<Route exact path="/:id/store" component={StoreFront} /> }
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
