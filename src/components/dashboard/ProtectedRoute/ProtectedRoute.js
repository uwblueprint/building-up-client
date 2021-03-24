import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

/* 
  A wrapper for <Route> that redirects to the login
  screen if you're not yet authenticated.
*/
const ProtectedRoute = ({ children, setRedirect, ...rest }) => {
  const { user } = useSelector(state => state.auth);

  const location = useLocation();
  setRedirect(location.pathname);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
