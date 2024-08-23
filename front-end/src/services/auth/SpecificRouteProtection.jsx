import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

const SpecificRouteProtection = ({ role, children }) => {
  const { user } = useContext(UserContext);
console.log('this',role);
console.log(user.role.roleName);
  if (!user || user.role.roleName !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SpecificRouteProtection;