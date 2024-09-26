import React, { useState, useContext } from 'react';
import './Header.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { Cartcontext } from '../context/CartContext';
import UserContext from '../context/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(Cartcontext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProtectedRoute = (route) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(route);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img
            src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049_640.png"
            alt="logo"
          />
        </div>

        {/* Navigation Menu */}
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user/shop">Shop</Link></li>
            <li><Link to="/user/product-filtering">Products-Filtering</Link></li>
            
          </ul>
        </nav>

        {/* Toggler Button for Mobile */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Right Section with Search, Cart, and User Icons */}
        <div className="header-right">
          
          
          <div className="header-cart">
            <span onClick={() => handleProtectedRoute('/user/cart')}>
              <i className="fa fa-shopping-cart"></i> {/* Font Awesome Cart Icon */}
              <span className="cart-count">{user ? totalItems : 0}</span> {/* Dynamically show the number of items */}
            </span>
          </div>
          <div className="header-user">
            <span onClick={() => handleProtectedRoute('/user/profile')}>
              <i className="fa fa-user"></i> {/* Font Awesome User Icon */}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
