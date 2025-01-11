'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookingForm from '@/components/bookings/BookingForm';

interface PageProps {
  params: { id: string };
}

export default function EditManualBookingPage({ params }: PageProps) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(
          `http://localhost:5000/api/manual-bookings/${id}`,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );

        // Transform dates to expected format
        const bookingData = response.data;
        if (bookingData.schedule?.date) {
          bookingData.schedule.date = new Date(bookingData.schedule.date)
            .toISOString()
            .split('T')[0];
        }

        setBooking(bookingData);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching booking:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch booking details');
        router.push('/admin/bookings/manual');
      }
    };

    if (id) {
      fetchBooking();
    }
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
          <p className="mt-2 text-gray-600">The booking you're looking for doesn't exist or has been removed.</p>
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

  return <BookingForm id={id} initialData={booking} />;
} 