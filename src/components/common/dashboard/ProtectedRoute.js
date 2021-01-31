import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../../../pages/User/Login';
import Logout from '../../../pages/User/Logout';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector(state => state.auth);

  if (isLoggedIn) {
    return <Logout />;
  } else {
    return <Login />;
  }
};

export default ProtectedRoute;
