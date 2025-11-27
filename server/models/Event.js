const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'ISE', 'Other'],
    },
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;