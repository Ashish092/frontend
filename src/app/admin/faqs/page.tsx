'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

const categories = ['Services', 'Booking', 'Products', 'Safety', 'Pricing'];

export default function AdminFAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'Services',
        order: 0
    });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/faqs');
            setFaqs(response.data.sort((a: FAQ, b: FAQ) => a.order - b.order));
        } catch (err) {
            setError('Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/faqs', formData);
            setShowAddForm(false);
            resetForm();
            fetchFaqs();
        } catch (err) {
            setError('Failed to add FAQ');
        }
    };

    const handleEdit = async (id: string) => {
        if (editingId === id) {
            try {
                const faqToUpdate = faqs.find(faq => faq._id === id);
                if (!faqToUpdate) return;
                
                await axios.put(`http://localhost:5000/api/faqs/${id}`, formData);
                setEditingId(null);
                fetchFaqs();
            } catch (err) {
                setError('Failed to update FAQ');
            }
        } else {
            const faq = faqs.find(f => f._id === id);
            if (faq) {
                setFormData({
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category,
                    order: faq.order
                });
                setEditingId(id);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await axios.delete(`http://localhost:5000/api/faqs/${id}`);
                fetchFaqs();
            } catch (err) {
                setError('Failed to delete FAQ');
            }
        }
    };

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = faqs.findIndex(faq => faq._id === id);
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === faqs.length - 1)
        ) return;

        const newFaqs = [...faqs];
        const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        
        // Swap orders
        const tempOrder = newFaqs[currentIndex].order;
        newFaqs[currentIndex].order = newFaqs[swapIndex].order;
        newFaqs[swapIndex].order = tempOrder;

        try {
            await Promise.all([
                axios.put(`http://localhost:5000/api/faqs/${newFaqs[currentIndex]._id}`, 
                    { order: newFaqs[currentIndex].order }),
                axios.put(`http://localhost:5000/api/faqs/${newFaqs[swapIndex]._id}`, 
                    { order: newFaqs[swapIndex].order })
            ]);
            fetchFaqs();
        } catch (err) {
            setError('Failed to reorder FAQs');
        }
    };

    const resetForm = () => {
        setFormData({
            question: '',
            answer: '',
            category: 'Services',
            order: faqs.length
        });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">FAQ Management</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                    {showAddForm ? <X size={20} /> : <Plus size={20} />}
                    {showAddForm ? 'Cancel' : 'Add New FAQ'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showAddForm && (
                <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1">Question</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={e => setFormData({...formData, question: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Answer</label>
                            <textarea
                                value={formData.answer}
                                onChange={e => setFormData({...formData, answer: e.target.value})}
                                className="w-full p-2 border rounded"
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                                className="w-full p-2 border rounded"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add FAQ
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={faq._id} className="bg-white p-4 rounded-lg shadow-sm">
                        {editingId === faq._id ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={formData.question}
                                    onChange={e => setFormData({...formData, question: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    value={formData.answer}
                                    onChange={e => setFormData({...formData, answer: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    className="w-full p-2 border rounded"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <div className="font-medium">{faq.question}</div>
                                <div className="text-gray-600 mt-2">{faq.answer}</div>
                                <div className="text-sm text-gray-500 mt-1">Category: {faq.category}</div>
                            </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(faq._id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    {editingId === faq._id ? <Check size={20} /> : <Pencil size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(faq._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="flex gap-2">
                                {index > 0 && (
                                    <button
                                        onClick={() => handleReorder(faq._id, 'up')}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <ChevronUp size={20} />
                                    </button>
                                )}
                                {index < faqs.length - 1 && (
                                    <button
                                        onClick={() => handleReorder(faq._id, 'down')}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <ChevronDown size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 