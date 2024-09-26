import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css'; // Importing the CSS file

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (err) {
                console.log("Error fetching users", err);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.log("Error deleting user", err);
        }
    };

    return (
        <div className="users-list">
            <h2>Users</h2>
            <div className="user-cards">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <div className="user-details">
                            <div className="user-detail">
                                <span className="detail-label">Name:</span>
                                <span className="detail-value">{user.name}</span>
                            </div>
                            <div className="user-detail">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{user.email}</span>
                            </div>
                            <div className="user-detail">
                                <span className="detail-label">Type:</span>
                                <span className="detail-value">{user.isAdmin ? "Admin" : "User"}</span>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(user._id)} className="delete-button">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;
