const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  // Example API call
  getData: async () => {
    try {
      const response = await fetch(`${API_URL}/api/endpoint`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  // Add other API calls here
}; 