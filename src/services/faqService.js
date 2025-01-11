import api from '../config/axios';

export const getFaqs = async () => {
    try {
        const response = await api.get('/api/faqs');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch FAQs';
    }
};

export const createFaq = async (faqData) => {
    try {
        const response = await api.post('/api/faqs', faqData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create FAQ';
    }
};

export const updateFaq = async (id, faqData) => {
    try {
        const response = await api.put(`/api/faqs/${id}`, faqData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update FAQ';
    }
};

export const deleteFaq = async (id) => {
    try {
        await api.delete(`/api/faqs/${id}`);
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete FAQ';
    }
}; 