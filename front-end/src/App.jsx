import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SlidingLoginSignup from "./pages/SigninSignup";
import Dashboard from "./pages/Dashboard";
import { registerLicense } from '@syncfusion/ej2-base';
import ProtectedRoute from "./services/auth/ProtectedRoute";


let key = "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhfcnRQRWBYUkRyXUY=";
registerLicense(key);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/get-started" element={<SlidingLoginSignup />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
