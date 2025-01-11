import React, { useState, useEffect } from 'react';
import { getFaqs } from '../services/faqService';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

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

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-xl text-gray-600">Loading FAQs...</div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-xl text-red-500">Error: {error}</div>
        </div>
    );

    if (!faqs.length) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-xl text-gray-600">No FAQs available</div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={faq._id} 
                        className="border rounded-lg overflow-hidden bg-white shadow-sm"
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                            onClick={() => toggleFaq(index)}
                        >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <span className={`transform transition-transform duration-200 ${
                                activeIndex === index ? 'rotate-180' : ''
                            }`}>
                                ▼
                            </span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-6 py-4 bg-gray-50">
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ; 