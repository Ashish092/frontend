import axios from 'axios';
import { API_URL } from '@/config/api';

export const loginAdmin = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/login`, credentials);
        if (response.data.success) {
            localStorage.setItem('adminToken', response.data.token);
            return response.data;
        }
        throw new Error(response.data.message || 'Login failed');
    } catch (error) {
        throw error.response?.data?.message || 'An error occurred during login';
    }
};

export const checkAuthStatus = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${API_URL}/api/admin/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.success;
    } catch (error) {
        localStorage.removeItem('adminToken');
        throw error;
    }
};

export const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
}; 