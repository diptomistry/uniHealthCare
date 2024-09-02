import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PasskeyProtectedRoute = ({ passkey, children }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userPasskey = query.get("passkey");

  if (userPasskey === passkey) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PasskeyProtectedRoute;
