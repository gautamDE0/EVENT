import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import axios from 'axios';
import './AuthStyles.css';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', { email, password });
            console.log('API Base URL:', API_BASE_URL);
            
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            console.log('Login response:', res.data);
            
            localStorage.setItem('token', res.data.token);
            navigate('/student/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            
            // Provide more detailed error information
            let errorMessage = 'Login failed';
            if (err.response) {
                // Server responded with error status
                errorMessage = err.response.data.message || `Server error: ${err.response.status}`;
            } else if (err.request) {
                // Request was made but no response received
                errorMessage = 'No response from server. Check if backend is running.';
            } else {
                // Something else happened
                errorMessage = err.message;
            }
            
            console.error('Login failed:', errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Log in to your account">
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label className="label">Email Address</label>
                    <input
                        type="email"
                        required
                        className="input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        required
                        className="input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Log In
                </button>
            </form>

            <div className="text-center">
                <p className="helper-text">
                    Don't have an account?{' '}
                    <Link to="/signup" className="link">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default StudentLogin;