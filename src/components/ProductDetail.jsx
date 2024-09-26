import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { Cartcontext } from '../context/CartContext';
import UserContext from '../context/UserContext';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(Cartcontext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/SingleProduct/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Error fetching product details.");
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        if (product) {
            if (user) {
                addToCart(product, quantity);
                toast.success('Product added to cart!'); // Show toast notification
            } else {
                navigate('/login');
            }
        }
    };

    const handleBuyNow = () => {
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        if (product) {
            if (user) {
                addToCart(product, quantity);
                navigate('/user/check-out'); // Redirect to checkout page
            } else {
                navigate('/login');
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <ToastContainer /> {/* Include ToastContainer for toast notifications */}
            <div className="product-image">
                <img src={product.img || 'https://via.placeholder.com/500'} alt={product.pname} />
            </div>
            <div className="product-info">
                <h1>{product.pname}</h1>
                <h3>{product.brandname}</h3>
                <p>{product.des}</p>
                <h2>${product.price}</h2>

                <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
                </div>

                <div className="buttons">
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleBuyNow}>Buy Now</button>
                </div>

                {/* Optional: Reviews Section */}
                <div className="reviews">
                    <h3>Reviews</h3>
                    {/* Display reviews here */}
                </div>

                {/* Optional: Related Products Section */}
                <div className="related-products">
                    <h3>Related Products</h3>
                    {/* Display related products here */}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
