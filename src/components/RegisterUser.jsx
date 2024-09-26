import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import styles from "./RegisterUser.module.css";

function RegisterUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // Default false
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name || !email || !password) {
            toast.error("Please fill out all fields"); // Show error toast
            return false;
        }
        return true;
    };

    const checkPasswordStrength = (password) => {
        if (password.length < 6) {
            setPasswordStrength("Weak");
        } else if (password.length < 10) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                name,
                email,
                password,
                isAdmin,
            });
            // Clear fields after successful registration
            setName("");
            setEmail("");
            setPassword("");
            setIsAdmin(false);  // Reset isAdmin
            toast.success("Registration Successful!"); // Show success toast
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration
            }, 2000);
        } catch (err) {
            toast.error("Registration failed. Please try again."); // Show error toast
        }
    };

    return (
        <div className={styles.center}>
            <ToastContainer /> {/* Add ToastContainer */}
            <div className={styles.signUp}>
                <div className={styles.right}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <h1>Register</h1>
                            <div className={styles.inputBordered}>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    id='name'
                                    className={styles.first}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputBordered}>
                                <label htmlFor='emailaddress'>Email Address</label>
                                <input
                                    type='email'
                                    id='emailaddress'
                                    className={styles.first}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.inputBordered}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id='password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                />
                                <span
                                    className={styles.togglePassword}
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? "Hide" : "Show"}
                                </span>
                                <div className={styles.passwordStrength}>{passwordStrength}</div>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.inputBordered}>
                                <label htmlFor='isAdmin'>Admin</label>
                                <input
                                    type='checkbox'
                                    id='isAdmin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <input type='submit' value='Register' />
                        </div>
                        <div className={styles.loginRedirect}>
                            Already Registered? <span onClick={() => navigate('/login')}>Login</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;
