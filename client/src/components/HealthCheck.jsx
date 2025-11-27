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
        // Test the health endpoint specifically
        const response = await axios.get(`${API_BASE_URL}/health`, {
          timeout: 5000 // 5 second timeout
        });
        setStatus('Connected');
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Health check failed:', error);
        setStatus('Disconnected');
        setDetails(`Error: ${error.message}`);
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