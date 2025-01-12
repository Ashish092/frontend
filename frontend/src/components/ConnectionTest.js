import React, { useEffect, useState } from 'react';

const ConnectionTest = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  if (error) return <div>Error connecting to backend: {error}</div>;
  if (!status) return <div>Loading...</div>;
  
  return <div>Backend Status: {status}</div>;
};

export default ConnectionTest; 