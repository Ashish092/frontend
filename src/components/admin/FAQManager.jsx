import React, { useState, useEffect } from 'react';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../../services/faqService';

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingFaq, setEditingFaq] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        order: 0
    });

    useEffect(() => {
        loadFaqs();
    }, []);

    const loadFaqs = async () => {
        try {
            const data = await getFaqs();
            setFaqs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFaq) {
                await updateFaq(editingFaq._id, formData);
            } else {
                await createFaq(formData);
            }
            loadFaqs();
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (faq) => {
        setEditingFaq(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            order: faq.order
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await deleteFaq(id);
                loadFaqs();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const resetForm = () => {
        setEditingFaq(null);
        setFormData({ question: '', answer: '', order: 0 });
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">FAQ Management</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl mb-4">
                    {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                </h3>
                <div className="mb-4">
                    <label className="block mb-2">Question</label>
                    <input
                        type="text"
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Answer</label>
                    <textarea
                        value={formData.answer}
                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Order</label>
                    <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                    {editingFaq && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq._id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold">{faq.question}</h4>
                                <p className="text-gray-600 mt-2">{faq.answer}</p>
                                <p className="text-sm text-gray-500 mt-1">Order: {faq.order}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(faq)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(faq._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQManager; 