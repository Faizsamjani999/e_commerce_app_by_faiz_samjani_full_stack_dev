import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token in AdminProtectedRoute:", token);

                if (!token) {
                    setIsAdmin(false);
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/check-admin`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Admin Check Response:", res.data);
                setIsAdmin(!!res.data.message);  // Yahan ensure karo ki message boolean ho

            } catch (err) {
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        }
        checkAdmin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminProtectedRoute;
