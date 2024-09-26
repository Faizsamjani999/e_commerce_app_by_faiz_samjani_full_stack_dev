import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderList.css'; // Importing the CSS file

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (err) {
                console.log("Error fetching orders", err);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className="order-list">
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id} className="order-item">
                        <div className="order-info">
                            <div className="order-detail">
                                <strong>Order ID:</strong> {order._id}
                            </div>
                            <div className="order-detail">
                                <strong>User Name:</strong> {order.user ? order.user.name : "N/A"}
                            </div>
                            <div className="order-detail">
                                <strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </div>
                            <div className="order-detail">
                                <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
                            </div>
                            <div className="order-detail">
                                <strong>Amount:</strong> ₹{order.amount || "N/A"}
                            </div>
                            <div className="order-detail">
                                <strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString() || "N/A"}
                            </div>
                            {order.statusHistory && order.statusHistory.length > 0 && (
                                <div className="order-detail">
                                    <strong>Status History:</strong>
                                    <ul>
                                        {order.statusHistory.map((status, index) => (
                                            <li key={index}>
                                                {status.status} - {new Date(status.timestamp).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
