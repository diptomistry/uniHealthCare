import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  UserContext  from './UserProvider';

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/get-started" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
