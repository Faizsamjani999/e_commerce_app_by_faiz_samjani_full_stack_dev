import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // Updated CSS file link

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Fetch user data
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/profile`, config);
      setUserData(response.data);
      
      // Fetch user orders
      const ordersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/user/orders`, config);
      setOrders(ordersResponse.data || []);

      setLoading(false);
    } catch (error) {
      setError(error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-heading">My Profile</h1>
        <div className="profile-details">
          <div className="profile-detail">
            <p><strong>Name:</strong> {userData.name || "N/A"}</p>
            <p><strong>Email:</strong> {userData.email || "N/A"}</p>
            <p><strong>Member Since:</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
        <h2 className="orders-heading">My Orders</h2>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-header">
                  <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <p><strong>Status:</strong> {order.status || "N/A"}</p>
                </div>
                <div className="order-details">
                  <p><strong>Total Amount:</strong> ₹{order.amount || "N/A"}</p>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString() || "N/A"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">You have no orders.</div>
          )}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
