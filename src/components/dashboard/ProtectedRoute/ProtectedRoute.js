import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

/* 
  A wrapper for <Route> that redirects to the login
  screen if you're not yet authenticated.
*/
const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
