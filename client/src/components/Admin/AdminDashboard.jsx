import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, MapPin, Link as LinkIcon, LogOut } from 'lucide-react';
import EventForm from './EventForm';
import './AdminStyles.css';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const navigate = useNavigate();

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/events`);
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/api/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event');
            }
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingEvent(null);
        fetchEvents();
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div className="header-content">
                        <h1 className="dashboard-title">Admin Dashboard</h1>
                        <div className="header-actions">
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="action-button add-event-button"
                            >
                                <Plus size={18} />
                                <span>Add Event</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="action-button"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="no-events">
                        <p className="no-events-text">No events found. Create your first event!</p>
                    </div>
                ) : (
                    <div className="events-grid">
                        {events.map((event) => (
                            <div key={event._id} className="event-card">
                                <div className="event-card-header">
                                    <div className="event-header-content">
                                        <div>
                                            <span className="event-branch-tag">
                                                {event.branch}
                                            </span>
                                            <h3 className="event-title">{event.name}</h3>
                                        </div>
                                        <div className="event-actions">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="edit-button"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="delete-button"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="event-card-body">
                                    <div className="event-detail">
                                        <Calendar className="event-detail-icon" size={18} />
                                        <span>
                                            {new Date(event.lastDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="event-detail">
                                        <MapPin className="event-detail-icon" size={18} />
                                        <span>{event.venue}</span>
                                    </div>
                                    <div className="event-detail">
                                        <LinkIcon className="event-detail-icon" size={18} />
                                        <a
                                            href={event.registrationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="event-link"
                                        >
                                            Registration Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isFormOpen && (
                    <EventForm
                        isOpen={isFormOpen}
                        onClose={handleFormClose}
                        eventToEdit={editingEvent}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;