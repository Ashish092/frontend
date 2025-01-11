import api from '../config/axios';

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'An error occurred';
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('/api/users');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'An error occurred';
    }
}; 