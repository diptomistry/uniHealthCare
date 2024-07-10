import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SlidingLoginSignup from "./pages/SigninSignup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/get-started" element={<SlidingLoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
