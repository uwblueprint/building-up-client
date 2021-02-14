import React from 'react';
import { useSelector } from "react-redux";
import Login from './User/Login';
import Logout from './User/Logout';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector(state => state.auth);

  if (isLoggedIn) {
    return <Logout />;
  } else {
    return <Login />;
  }
};

export default ProtectedRoute;
