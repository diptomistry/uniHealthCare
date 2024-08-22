import React, { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { UserContext } from './UserProvider';
import Dashboard from '../../pages/Dashboard';


const ProtectedRoute = () => {
  const { user } = useContext(UserContext);


  if (!user) {
   
    return <Navigate to="/" replace />;
  }

  return <Dashboard />;
};

export default ProtectedRoute;
