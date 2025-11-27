const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'Mechanical', 'Civil', 'ISE', 'Other'],
    },
    lastDate: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    registrationLink: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
