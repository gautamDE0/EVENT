import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const AdminLoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting admin login with:', { email, password });
            console.log('API Base URL:', API_BASE_URL);
            
            const res = await axios.post(`${API_BASE_URL}/api/auth/admin-login`, { email, password });
            console.log('Admin login response:', res.data);
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'admin');
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Admin login error:', err);
            
            // Provide more detailed error information
            let errorMessage = 'Admin login failed';
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
            
            console.error('Admin login failed:', errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="modal-card"
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">Admin Access</h3>
                            <button
                                onClick={onClose}
                                className="modal-close-button"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@bmsce.ac.in"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Password</label>
                                    <input
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminLoginModal;