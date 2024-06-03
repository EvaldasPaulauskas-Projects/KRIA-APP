import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserService from "./service/UserService/UserService";
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar/Navbar';
import RegistrationPage from './pages/auth/RegistrationPage';

function App() {
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegistrationPage />} />

        {/* Authenticated User Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

        {/* Admin Routes */}
        {isAdmin && isAuthenticated && (
          <>
            {/* Add your admin routes here */}
          </>
        )}

        {/* Redirect to login if not authenticated and trying to access a non-public route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
