import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'

import StoreFront from '../pages/Storefront/storefront';
import TeamDashboard from '../pages/TeamDashboard/teamdashboard';
import Home from '../pages/home';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import { storeTheme, dashboardTheme } from './Themes'

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
                   <ThemeProvider theme={storeTheme}>
                   <Route exact path="/:id/store" component={StoreFront} />
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
