'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface QuoteData {
    _id: string;
    serviceType: string;
    cleaningType: string;
    frequency: string;
    // ... rest of your quote interface
}

interface ViewQuoteClientProps {
    id: string;
}

export default function ViewQuoteClient({ id }: ViewQuoteClientProps) {
    const [quote, setQuote] = useState<QuoteData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `http://localhost:5000/api/quotes/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setQuote(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch quote:', error);
                toast.error('Failed to fetch quote details');
                router.push('/admin/bookings/quotes');
            }
        };

        fetchQuote();
    }, [id, router]);

    if (loading) return <div>Loading...</div>;
    if (!quote) return <div>Quote not found</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/admin/bookings/quotes/${id}/edit`)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        <Edit size={18} />
                        Edit
                    </button>
                    <button
                        onClick={() => {/* handle delete */}}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>
            {/* Add the rest of your quote details display */}
        </div>
    );
} 