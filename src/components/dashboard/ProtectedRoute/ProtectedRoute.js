import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import EmailVerificationRequired from 'pages/EmailVerificationRequired/EmailVerificationRequired';
import { DASHBOARD_ROOT_PATH } from 'components/dashboard/DashboardRouter/DashboardRouter';

/**
 * A wrapper on <Route> that:
 * - Redirects to the login screen if the user is not authenticated.
 * - Displays the `EmailVerificationRequired` component if user is authenticated but email isn't verified
 *
 * The email verification component can be disabled for a given route with the `disableEmailVerify` prop
 */
const ProtectedRoute = ({ children, disableEmailVerify, ...rest }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          user.isVerified || disableEmailVerify ? (
            children
          ) : (
            <EmailVerificationRequired />
          )
        ) : (
          <Redirect
            to={{
              pathname: `${DASHBOARD_ROOT_PATH}/login`,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
