import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UsersList from './components/UsersList'; // Import the UsersList component
import AdminProtectedRoute from './components/AdminProtectedRoute'; // Import AdminProtectedRoute here
import './Admin.css';
import OrderList from './components/OrderList';

const Admin = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path='/Add-Product' 
            element={
              <AdminProtectedRoute>
                <AddProduct/>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <AdminProtectedRoute>
                <ProductList />
              </AdminProtectedRoute>
            } 
          />
                <Route 
          path="/orders" 
          element={
              <AdminProtectedRoute>
                  <OrderList />
              </AdminProtectedRoute>
          } 
      />

          <Route 
            path="/users"
            element={
              <AdminProtectedRoute>
                <UsersList />
              </AdminProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
