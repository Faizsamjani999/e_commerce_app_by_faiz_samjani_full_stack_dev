import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners'; // Importing a loader
import './ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loader
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/GetProduct`);
        setTimeout(() => {
          setProducts(response.data);
          setFilteredProducts(response.data);
          setLoading(false); // Stop loader after 4-5 seconds
        }, 4000); // Simulating a 4-second loading time
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loader on error
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value);
  };

  const filterProducts = (term) => {
    const filtered = products.filter(product =>
      product.pname.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

  return (
    <div className="product-listing-container">
      <h2>Product Listing</h2>

      {loading ? (
        // Show loader while loading
        <div className="loader-container">
          <BarLoader color="#3498db" width="100%" height={4} />
        </div>
      ) : (
        // Show product listing after loading completes
        <>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.img || 'https://via.placeholder.com/500'}
                  alt={product.pname}
                  className="product-image"
                />
                <h3>{product.pname}</h3>
                <h5>{product.brandname}</h5>
                <p>{product.des}</p>
                <span>${product.price}</span>
                <button onClick={() => navigate(`/product/${product._id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
