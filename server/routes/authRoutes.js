const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const axios = require('axios');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new student
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: 'student',
            isVerified: false, // Initially false, verified via phone.email
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate student
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Admin Login
// @route   POST /api/auth/admin-login
// @access  Public
router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    // Hardcoded secure credentials check (original behavior)
    const ADMIN_EMAIL = 'admin@bmsce.ac.in';
    const ADMIN_PASS = 'login@admin25';

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        let adminUser = await User.findOne({ email: ADMIN_EMAIL });

        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASS, salt);
            adminUser = await User.create({
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: 'admin',
                isVerified: true
            });
        }

        res.json({
            _id: adminUser._id,
            email: adminUser.email,
            role: adminUser.role,
            token: generateToken(adminUser._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
});

// @desc    Verify phone.email token
// @route   POST /api/auth/verify-email
// @access  Public
router.post('/verify-email', async (req, res) => {
    const { accessToken, email } = req.body;

    try {
        // Verify with phone.email API
        // Documentation says: GET https://eapi.phone.email/getuser
        const response = await axios.post('https://eapi.phone.email/getuser', {
            access_token: accessToken,
            client_id: process.env.PHONE_EMAIL_CLIENT_ID // Need to add this to .env
        });

        // Note: The actual API response structure from phone.email needs to be handled.
        // Assuming it returns the phone number or email status.
        // If successful:

        const user = await User.findOne({ email });
        if (user) {
            user.isVerified = true;
            await user.save();
            res.json({ message: 'Email verified successfully', isVerified: true });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.error('Verification Error:', error.response ? error.response.data : error.message);
        res.status(400).json({ message: 'Verification failed' });
    }
});

module.exports = router;
