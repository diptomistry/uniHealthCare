import React,{useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from './UserProvider';
const PasskeyProtectedRoute = ({ passkey, children }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userPasskey = query.get("passkey");
  const { user } = useContext(UserContext);
  if (user && userPasskey === passkey) {
    return children;
  } else {
    return <Navigate to="/get-started" replace />;
  }
};

export default PasskeyProtectedRoute;
