import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import './AdminStyles.css';

const EventForm = ({ isOpen, onClose, eventToEdit, onEventSaved }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        venue: '',
        branch: '',
        link: ''
    });

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                title: eventToEdit.title || '',
                date: eventToEdit.date ? new Date(eventToEdit.date).toISOString().split('T')[0] : '',
                time: eventToEdit.time || '',
                venue: eventToEdit.venue || '',
                branch: eventToEdit.branch || '',
                link: eventToEdit.link || ''
            });
        } else {
            setFormData({
                title: '',
                date: '',
                time: '',
                venue: '',
                branch: '',
                link: ''
            });
        }
    }, [eventToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            if (eventToEdit) {
                await axios.put(`${API_BASE_URL}/api/events/${eventToEdit._id}`, formData, config);
            } else {
                await axios.post(`${API_BASE_URL}/api/events`, formData, config);
            }
            onClose();
            onEventSaved();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
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
                            <h3 className="modal-title">
                                {eventToEdit ? 'Edit Event' : 'Add New Event'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="modal-close-button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-group">
                                    <label className="label">Event Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="input"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter event name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label">Branch</label>
                                    <select
                                        name="branch"
                                        className="select"
                                        value={formData.branch}
                                        onChange={handleChange}
                                    >
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="Civil">Civil</option>
                                        <option value="ISE">ISE</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="label">Last Date of Registration</label>
                                    <input
                                        type="date"
                                        name="lastDate"
                                        required
                                        className="input"
                                        value={formData.lastDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label">Venue</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        required
                                        className="input"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        placeholder="Enter event venue"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label">Registration Link</label>
                                    <input
                                        type="url"
                                        name="registrationLink"
                                        required
                                        className="input"
                                        value={formData.registrationLink}
                                        onChange={handleChange}
                                        placeholder="https://example.com/register"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {eventToEdit ? 'Update Event' : 'Add Event'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EventForm;