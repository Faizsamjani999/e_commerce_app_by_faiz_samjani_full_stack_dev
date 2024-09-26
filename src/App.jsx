import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './Admin/Admin';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './components/HomePage';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import ProductListing from './components/ProductListing';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Header />
          <div>
            <Routes>
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/user/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/user/product-filtering" element={<ProductListing/>} />
              <Route path="/user/cart" element={<PrivateRoute element={CartPage} />} />
              <Route path="/user/check-out" element={<PrivateRoute element={CheckoutPage} />} />
              <Route path="/user/profile" element={<PrivateRoute element={ProfilePage} />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
