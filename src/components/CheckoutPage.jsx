import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './CheckoutPage.css'; // Make sure to import the CSS file

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      cartItems: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: {
        address,
        city,
        postalCode,
        country
      },
      paymentMethod,
      amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

      if (paymentMethod === 'Razorpay') {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/razorpay`, { amount: orderData.amount }, config);

        var options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: 'Quick Shopping App',
          description: 'Order Payment',
          order_id: data.id,
          handler: async function (response) {
            console.log('Payment Success:', response);

            await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/create`, orderData, config);
            toast.success('Payment Success and Order Created!'); // Stylish success message
            clearCart();
            resetForm(); // Reset form fields
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: '9574357690'
          },
          theme: {
            color: '#3399cc'
          }
        };

        var rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/create`, orderData, config);
        toast.success("Order placed successfully"); // Stylish success message
        clearCart();
        resetForm(); // Reset form fields
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order"); // Stylish error message
    }
  };

  const resetForm = () => {
    setAddress('');
    setCity('');
    setPostalCode('');
    setCountry('');
    setPaymentMethod('');
  };

  return (
    <div className="checkout-page">
      <ToastContainer /> {/* Include ToastContainer */}
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout} className="checkout-form">
        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
            <option value="">Select Payment Method</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Razorpay">Razorpay</option>
          </select>
        </div>
        <button type="submit" className="checkout-button">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
