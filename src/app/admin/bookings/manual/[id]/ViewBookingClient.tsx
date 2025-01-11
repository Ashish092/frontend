'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { 
    ArrowLeft, Edit, Trash2, Calendar, Clock, MapPin, 
    Mail, Phone, CheckCircle2 
} from 'lucide-react';

interface ManualBooking {
    _id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
    };
    schedule: {
        date: string;
        startTime: string;
        endTime: string;
    };
    service: {
        type: string;
        extras: string[];
    };
    status: string;
    notes?: string;
    total: number;
    createdAt: string;
    updatedAt: string;
}

interface ViewBookingClientProps {
    id: string;
}

export default function ViewBookingClient({ id }: ViewBookingClientProps) {
    const [booking, setBooking] = useState<ManualBooking | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `http://localhost:5000/api/manual-bookings/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBooking(response.data);
                setLoading(false);
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.error('Failed to fetch booking:', err);
                toast.error('Failed to fetch booking details');
                router.push('/admin/bookings/manual');
            }
        };

        fetchBooking();
    }, [id, router]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Booking not found</h2>
                    <p className="mt-2 text-gray-600">The booking you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <button
                        onClick={() => router.push('/admin/bookings/manual')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Bookings
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/admin/bookings/manual/${id}/edit`)}
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

            <div className="space-y-4">
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5" />
                    <span>{booking.customer.email}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5" />
                    <span>{booking.customer.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5" />
                    <span>{booking.address.street}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(booking.schedule.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5" />
                    <span>{booking.schedule.startTime} - {booking.schedule.endTime}</span>
                </div>
                {/* Status */}
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{booking.status}</span>
                </div>
            </div>
            
            {/* ... rest of your component JSX */}
        </div>
    );
} 