'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookingForm from '@/components/bookings/BookingForm';
import type { BookingFormData } from '@/types/booking';

interface EditBookingClientProps {
  id: string;
}

export default function EditBookingClient({ id }: EditBookingClientProps) {
  const [booking, setBooking] = useState<BookingFormData | null>(null);
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
      } catch (error) {
        console.error('Failed to fetch booking:', error);
        toast.error('Failed to fetch booking');
        router.push('/admin/bookings/manual');
      }
    };

    fetchBooking();
  }, [id, router]);

  if (loading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found</div>;

  return <BookingForm id={id} initialData={booking} />;
} 