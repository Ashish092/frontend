'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, Edit, Trash2, Calendar, Clock, MapPin, 
  Mail, Phone, DollarSign, Info, CheckCircle2 
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
    suburb: string;
    city: string;
    state: string;
    postcode: string;
  };
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
    bufferMinutes: number;
  };
  services: Array<{
    name: string;
    hours: number;
    amount: number;
    extras: Array<{
      name: string;
      price: number;
    }>;
  }>;
  status: string;
  notes: string;
  propertyDetails: {
    pets: {
      present: boolean;
      details: string;
    };
    equipment: {
      clientProvided: boolean;
      companyProvided: boolean;
      details: string;
    };
    parking: {
      type: string;
      instructions: string;
    };
  };
  payment: {
    method: string;
    timing: string;
    partialAmount?: number;
    notes: string;
  };
}

export default function ViewBookingPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<ManualBooking | null>(null);
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
        setBooking(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to fetch booking details');
        router.push('/admin/bookings/manual');
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(
          `http://localhost:5000/api/manual-bookings/${id}`,
          { 
            headers: { Authorization: `Bearer ${token}` } 
          }
        );
        toast.success('Booking deleted successfully');
        router.push('/admin/bookings/manual');
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateTotalAmount = () => {
    if (!booking?.services) return 0;
    return booking.services.reduce((total, service) => {
      const serviceTotal = service.amount;
      const extrasTotal = service.extras.reduce((sum, extra) => sum + extra.price, 0);
      return total + serviceTotal + extrasTotal;
    }, 0);
  };

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
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status and Basic Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{booking.customer.name}</h1>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  {booking.customer.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  {booking.customer.phone}
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{new Date(booking.schedule.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>{booking.schedule.startTime} - {booking.schedule.endTime}</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin size={16} className="mt-1" />
              <div>
                <div>{booking.address.street}</div>
                <div>
                  {[
                    booking.address.suburb,
                    booking.address.city,
                    booking.address.state,
                    booking.address.postcode
                  ].filter(Boolean).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Services</h2>
          <div className="space-y-4">
            {booking.services.map((service, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="text-sm text-gray-500">{service.hours} hours</div>
                  </div>
                  <div className="text-right">
                    <div>${service.amount}</div>
                    {service.extras.length > 0 && (
                      <div className="text-sm text-gray-500">
                        +${service.extras.reduce((sum, extra) => sum + extra.price, 0)} extras
                      </div>
                    )}
                  </div>
                </div>
                {service.extras.length > 0 && (
                  <div className="mt-2 pl-4 text-sm text-gray-500">
                    Extras: {service.extras.map(extra => extra.name).join(', ')}
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 font-semibold">
              <span>Total Amount</span>
              <span>${calculateTotalAmount().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pets */}
            <div>
              <h3 className="font-medium mb-2">Pets</h3>
              <div className="text-gray-600">
                {booking.propertyDetails.pets.present ? (
                  <div>
                    <CheckCircle2 className="inline-block w-4 h-4 text-green-500 mr-1" />
                    {booking.propertyDetails.pets.details}
                  </div>
                ) : (
                  <span>No pets present</span>
                )}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h3 className="font-medium mb-2">Equipment</h3>
              <div className="text-gray-600">
                {booking.propertyDetails.equipment.clientProvided && <div>Client provides equipment</div>}
                {booking.propertyDetails.equipment.companyProvided && <div>Company provides equipment</div>}
                {booking.propertyDetails.equipment.details && (
                  <div className="text-sm mt-1">{booking.propertyDetails.equipment.details}</div>
                )}
              </div>
            </div>

            {/* Parking */}
            <div>
              <h3 className="font-medium mb-2">Parking</h3>
              <div className="text-gray-600">
                <div>{booking.propertyDetails.parking.type}</div>
                {booking.propertyDetails.parking.instructions && (
                  <div className="text-sm mt-1">{booking.propertyDetails.parking.instructions}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-medium mb-2">Payment Method</div>
              <div className="text-gray-600 capitalize">{booking.payment.method || 'Not specified'}</div>
            </div>
            <div>
              <div className="font-medium mb-2">Payment Timing</div>
              <div className="text-gray-600">
                {booking.payment.timing === 'partial' 
                  ? `Partial Payment: $${booking.payment.partialAmount}`
                  : `Pay ${booking.payment.timing}`
                }
              </div>
            </div>
            {booking.payment.notes && (
              <div className="col-span-2">
                <div className="font-medium mb-2">Payment Notes</div>
                <div className="text-gray-600">{booking.payment.notes}</div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
            <div className="text-gray-600 whitespace-pre-wrap">{booking.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
} 