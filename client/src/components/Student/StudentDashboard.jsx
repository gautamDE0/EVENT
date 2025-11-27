import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, LogOut, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import './StudentStyles.css';

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('All');
    const navigate = useNavigate();

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedBranch === 'All') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.branch === selectedBranch));
        }
    }, [selectedBranch, events]);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/events`);
            setEvents(res.data);
            setFilteredEvents(res.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const branches = ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'ISE', 'Other'];

    return (
        <div className="student-dashboard">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div>
                            <h1 className="header-title">Upcoming Events</h1>
                            <p className="header-subtitle">Discover and register for the latest college events</p>
                        </div>

                        <div className="header-actions">
                            <div className="filter-container">
                                <Filter className="filter-icon" size={18} />
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="filter-select"
                                >
                                    {branches.map(branch => (
                                        <option key={branch} value={branch}>{branch}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="logout-button"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                    <div className="no-events">
                        <p className="no-events-text">No events found for {selectedBranch === 'All' ? 'any branch' : selectedBranch}.</p>
                    </div>
                ) : (
                    <div className="events-grid">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="event-card"
                            >
                                <div className="event-card-header">
                                    <span className="event-branch-tag">
                                        {event.branch}
                                    </span>
                                    <h3 className="event-title">{event.name}</h3>
                                </div>

                                <div className="event-card-body">
                                    <div className="event-detail">
                                        <Calendar className="event-detail-icon" size={18} />
                                        <span>
                                            {new Date(event.lastDate).toLocaleDateString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="event-detail">
                                        <MapPin className="event-detail-icon" size={18} />
                                        <span className="line-clamp-1">{event.venue}</span>
                                    </div>
                                </div>

                                <div className="event-card-footer">
                                    <a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="event-link"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;