import React from 'react';
import { motion } from 'framer-motion';
import './AuthStyles.css';

function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="auth-card"
                >
                    <div className="auth-header">
                        <h2 className="auth-title">{title}</h2>
                        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
                    </div>
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;