// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049_640.png"
            alt="EcoShop Logo"
          />
        </div>
        <div className="footer-content">
          <p>&copy; 2024 EcoShop. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
