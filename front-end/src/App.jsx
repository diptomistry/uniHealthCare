import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SlidingLoginSignup from "./components/LoginSignupPage/SigninSignup";
import Dashboard from "./pages/Dashboard";
import { registerLicense } from "@syncfusion/ej2-base";
import ProtectedRoute from "./services/auth/ProtectedRoute";
import AdditionalInfo from "./components/dashboard/Admin/AdditionalInfo";
import PasskeyProtectedRoute from "./services/auth/PasskeyProtectedRoute";
import { DutyRosterDoctor, Blog } from "./components/dashboard/Admin";
import SigninSignupRoot from "./pages/SigninSignupRoot";

import WebSocketComponent from "./layouts/dashboard/WebSocketConnect";
let key =
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhfcnRQRWBYUkRyXUY=";
registerLicense(key);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/get-started" element={<SigninSignupRoot />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/additional-info"
          element={
            <PasskeyProtectedRoute passkey="12345">
              <AdditionalInfo />
            </PasskeyProtectedRoute>
          }
        />
        <Route
          path="dashboard/dutyRosterDoctor"
          element={
            <PasskeyProtectedRoute passkey="12345">
              <DutyRosterDoctor />
            </PasskeyProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PasskeyProtectedRoute passkey="12345">
              <Blog />
            </PasskeyProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
