import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Import loader from react-spinners
import './CartPage.css';

function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to handle loading

    // Simulate loading for 4-5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 4-5 seconds
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (loading) {
        return (
            <div className="loader-container">
                <ClipLoader color="#3498db" loading={loading} size={80} /> {/* Customize the loader */}
                <p>Loading Cart...</p>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.img} alt={item.pname} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2>{item.pname}</h2>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Display Total Price */}
                    <div className="cart-total">
                        <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    </div>

                    <button onClick={clearCart}>Clear Cart</button>
                    <button onClick={() => navigate('/user/check-out')}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
