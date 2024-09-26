import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'; // Import the loader
import './Shop.css'; // Add appropriate styles in this CSS file

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/GetProduct`);
        setProducts(response.data);
        // Set loading to false after 4-5 seconds
        setTimeout(() => {
          setLoading(false);
        }, 4000); // 4 seconds delay
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <TailSpin
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
        <h3>Loading products...</h3>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h2>Shop</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.img || 'https://via.placeholder.com/500'} alt={product.pname} className="product-image" />
            <h3>{product.pname}</h3>
            <h5>{product.brandname}</h5>
            <p>{product.des}</p>
            <span>${product.price}</span>
            <button onClick={() => navigate(`/product/${product._id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
