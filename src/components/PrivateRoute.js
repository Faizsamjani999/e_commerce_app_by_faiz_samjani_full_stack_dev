import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const PrivateRoute = ({ element: Element }) => {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');

    return token ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;