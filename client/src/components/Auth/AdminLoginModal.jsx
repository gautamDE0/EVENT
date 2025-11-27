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
            const res = await axios.post(`${API_BASE_URL}/api/auth/admin-login`, { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'admin');
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            alert('Admin login failed');
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
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="label">Admin Email</label>
                                    <input
                                        type="email"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@event.com"
                                        required
                                    />
                                </div>

                                <div>
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

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login as Admin
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminLoginModal;