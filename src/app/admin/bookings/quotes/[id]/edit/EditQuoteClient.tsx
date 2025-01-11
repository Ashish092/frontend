'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookingForm from '@/components/bookings/BookingForm';
import type { BookingFormData } from '@/types/booking';

interface EditQuoteClientProps {
    id: string;
}

export default function EditQuoteClient({ id }: EditQuoteClientProps) {
    const [quote, setQuote] = useState<BookingFormData | null>(null);
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

    return <BookingForm id={id} initialData={quote} />;
} 