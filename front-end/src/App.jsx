import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  UserProvider  from './services/auth/UserProvider';
import Homepage from './pages/Homepage';
import SlidingLoginSignup from './pages/SigninSignup';
import ProtectedRoute from './services/auth/ProtectedRoute';

import Profile from './pages/role-based-access/Profile';
import RootLayout from './layouts/RootLayout';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/get-started" element={<SlidingLoginSignup />} />
          <Route path='/dashboard' element={<ProtectedRoute ><RootLayout/></ProtectedRoute>}>
                <Route path="profile" element={<Profile/>}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;