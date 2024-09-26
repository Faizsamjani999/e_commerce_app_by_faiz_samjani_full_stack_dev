import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import styles from "./Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            toast.error("Please fill out all fields"); // Show error toast
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email,
                password
            });
    
            const { token, user } = res.data;
    
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Token Set:", localStorage.getItem('token'));
                toast.success("Login Successful!"); // Show success toast
    
                // Redirect after a delay to show the toast
                setTimeout(() => {
                    if (user.isAdmin) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/');
                    }
                }, 2000); // Redirect after 2 seconds
            }
    
            console.log(res.data.message);
            setEmail("");
            setPassword("");
        } catch (err) {
            toast.error("Invalid Credential..."); // Show error toast
        }
    };

    return (
        <div className={styles.center}>
            <ToastContainer /> {/* Add ToastContainer */}
            <div className={styles.loginCard}>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className={styles.inputField}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor='password'>Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className={styles.togglePassword}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </span>
                    </div>
                    <button type="submit">Login</button>
                    <div className={styles.registerRedirect}>
                        New User? <span onClick={() => navigate('/register')}>Register Here</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
