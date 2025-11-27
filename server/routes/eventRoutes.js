const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (Admin only)
const protectAdmin = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (req.user && req.user.role === 'admin') {
                next();
            } else {
                res.status(401).json({ message: 'Not authorized as admin' });
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
router.post('/', protectAdmin, async (req, res) => {
    const { title, date, time, venue, branch, link } = req.body;

    try {
        const event = new Event({
            title,
            date,
            time,
            venue,
            branch,
            link,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', protectAdmin, async (req, res) => {
    const { title, date, time, venue, branch, link } = req.body;

    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.date = date || event.date;
            event.time = time || event.time;
            event.venue = venue || event.venue;
            event.branch = branch || event.branch;
            event.link = link || event.link;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete('/:id', protectAdmin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;