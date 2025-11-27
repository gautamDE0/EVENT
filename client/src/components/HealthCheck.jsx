import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthCheck = () => {
  const [status, setStatus] = useState('Checking...');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkHealth = async () => {
      try {
        console.log('Checking health at:', `${API_BASE_URL}/health`);
        // Test the health endpoint specifically
        const response = await axios.get(`${API_BASE_URL}/health`, {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setStatus('Connected');
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Health check failed:', error);
        setStatus('Disconnected');
        
        // Provide more detailed error information
        let errorMessage = 'Unknown error';
        if (error.response) {
          // Server responded with error status
          errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
          setDetails({
            message: errorMessage,
            status: error.response.status,
            data: error.response.data
          });
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = 'No response from server. Check if backend is running.';
          setDetails({
            message: errorMessage,
            error: error.message
          });
        } else {
          // Something else happened
          errorMessage = `Request error: ${error.message}`;
          setDetails({
            message: errorMessage
          });
        }
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return <div className="health-check">Checking backend connection...</div>;
  }

  return (
    <div className={`health-check ${status.toLowerCase()}`}>
      <span className="status-indicator"></span>
      <span>Backend: {status}</span>
      {details && (
        <div className="health-details">
          {typeof details === 'object' ? (
            <pre>{JSON.stringify(details, null, 2)}</pre>
          ) : (
            <span>{details}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthCheck;