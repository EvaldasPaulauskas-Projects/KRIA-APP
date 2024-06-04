import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserService from "./service/UserService/UserService";
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar/Navbar';
import RegistrationPage from './pages/auth/RegistrationPage';
import AdminBoard from './pages/AdminBoard';
import AddCategory from './pages/category/AddCategory';
import EditCategory from './pages/category/EditCategory';
import AddBook from './pages/book/AddBook';
import EditBook from './pages/book/EditBook';
import AllBooks from './pages/AllBooks';
import ViewBoook from './pages/book/ViewBook';

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
        <Route path="/all-books" element={isAuthenticated ? <AllBooks /> : <Navigate to="/" />} />

        <Route path="/view-book/:id" element={<ViewBoook />} />

        {/* Admin Routes */}
        {isAdmin && isAuthenticated && (
          <>
            {/* Add your admin routes here */}
            <Route path="/admin-board" element={<AdminBoard />} />

            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />

            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
          </>
        )}

        {/* Redirect to login if not authenticated and trying to access a non-public route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
