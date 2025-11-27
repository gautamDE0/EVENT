import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AdminLoginModal from './AdminLoginModal';
import { Settings } from 'lucide-react';
import axios from 'axios';
import './AuthStyles.css';

function StudentSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const navigate = useNavigate();

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        document.body.appendChild(script);

        window.phoneEmailListener = async function (userObj) {
            const { user_json_url, user_country_code, user_phone_number } = userObj;
            console.log("Verified user:", userObj);
            alert("Verification Successful! (Integration pending backend token validation)");
        };

        return () => {
            document.body.removeChild(script);
            delete window.phoneEmailListener;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/student/dashboard');
        } catch (err) {
            console.error(err);
            alert('Signup failed');
        }
    };

    return (
        <AuthLayout title="Student Registration" subtitle="Create your account to join events">
            <div className="relative">
                <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="admin-settings-button"
                    aria-label="Admin login"
                >
                    <Settings size={20} />
                </button>
            </div>

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

                {/* phone.email Button Container */}
                <div className="pe_signin_button" data-client-id="YOUR_CLIENT_ID_HERE"></div>

                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>

            <div className="text-center">
                <p className="helper-text">
                    Already have an account?{' '}
                    <Link to="/login" className="link">
                        Log in
                    </Link>
                </p>
            </div>

            <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
        </AuthLayout>
    );
};

export default StudentSignup;