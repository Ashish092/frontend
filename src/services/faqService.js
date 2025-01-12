import axiosInstance from '@/config/axios';

export const getFaqs = async () => {
    try {
        const response = await axiosInstance.get('/api/faqs');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch FAQs';
    }
};

export const createFaq = async (faqData) => {
    try {
        const response = await axiosInstance.post('/api/faqs', faqData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create FAQ';
    }
};

export const updateFaq = async (id, faqData) => {
    try {
        const response = await axiosInstance.put(`/api/faqs/${id}`, faqData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update FAQ';
    }
};

export const deleteFaq = async (id) => {
    try {
        await axiosInstance.delete(`/api/faqs/${id}`);
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete FAQ';
    }
}; 