import React from 'react';
import { Link } from "react-router-dom"
import './HomePage.css'; // Ensure this CSS file is properly styled

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products with great deals</p>
          <Link to="/user/shop"><button>Shop Now</button></Link>
        </div>
        <img
          src="https://t4.ftcdn.net/jpg/03/09/86/97/360_F_309869755_IquCHHxF7YABo2odctUGEjMrgVDSM8qV.jpg"
          alt="Hero"
          className="hero-image"
        />
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          <div className="category-item">
            <img
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Category 1"
            />
            <h3>Electronics</h3>
          </div>
          <div className="category-item">
            <img
              // src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              src='https://img.freepik.com/free-photo/woman-black-trousers-purple-blouse-laughs-leaning-stand-with-elegant-clothes-pink-background_197531-17614.jpg'
              alt="Category 2"
            />
            <h3>Fashion</h3>
          </div>
          <div className="category-item">
            <img
              // src="https://images.unsplash.com/photo-1527176930608-09cb256ab504?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              src='https://live.staticflickr.com/3947/15525016528_de56d4c7f3_b.jpg'
              alt="Category 3"
            />
            <h3>Home & Furniture</h3>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <img
              src='https://images.samsung.com/is/image/samsung/assets/in/smartphones/mobiles-by-price/Smartphones-above-50000-Mob1.jpg?$720_N_JPG$'
              alt="Product 1"
            />
            <h3>Smartphone</h3>
            <p>$49,999</p>
          </div>
          <div className="product-item">
            <img
              src="https://w0.peakpx.com/wallpaper/83/333/HD-wallpaper-notepad-handle-wrist-watch.jpg"
              alt="Product 2"
            />
            <h3>Wristwatch</h3>
            <p>$199</p>
          </div>
          <div className="product-item">
            <img
              src="https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg"
              alt="Product 3"
            />
            <h3>Headphones</h3>
            <p>$99</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest updates and offers.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>
    </div>
  );
};

export default HomePage;
