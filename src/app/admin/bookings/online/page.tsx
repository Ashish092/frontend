'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Search, ArrowUpDown, Eye, Edit 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/config/api';

interface OnlineBooking {
  _id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    suburb: string;
    city: string;
  };
  schedule: {
    date: string;
    time: string;
  };
  service: {
    name: string;
    price: number;
    extras: Array<{
      name: string;
      price: number;
    }>;
  };
  status: string;
  totalAmount: number;
}

// Add this interface for the raw data from the API
interface RawBookingData {
  _id: string;
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  suburb?: {
    name?: string;
    city?: string;
  };
  schedule?: {
    date?: string;
    time?: string;
  };
  service?: {
    title?: string;
    price?: number;
    extras?: Array<{
      name: string;
      price: number;
    }>;
  };
  status?: string;
}

export default function OnlineBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<OnlineBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<OnlineBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'date' | 'name' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filterAndSortBookings = useCallback(() => {
    let filtered = [...bookings];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${booking.address.suburb} ${booking.address.city}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareResult = 0;
      switch (sortField) {
        case 'date':
          compareResult = new Date(a.schedule.date).getTime() - new Date(b.schedule.date).getTime();
          break;
        case 'name':
          compareResult = a.customer.name.localeCompare(b.customer.name);
          break;
        case 'amount':
          compareResult = a.totalAmount - b.totalAmount;
          break;
      }
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, sortField, sortDirection]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterAndSortBookings();
  }, [filterAndSortBookings]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Transform the data to match our interface
      const transformedBookings = response.data.map((booking: RawBookingData) => ({
        _id: booking._id,
        customer: {
          name: `${booking.customer?.firstName || ''} ${booking.customer?.lastName || ''}`.trim(),
          email: booking.customer?.email || '',
          phone: booking.customer?.phone || ''
        },
        address: {
          suburb: booking.suburb?.name || '',
          city: booking.suburb?.city || ''
        },
        schedule: {
          date: booking.schedule?.date || '',
          time: booking.schedule?.time || ''
        },
        service: {
          name: booking.service?.title || '',
          price: booking.service?.price || 0,
          extras: booking.service?.extras || []
        },
        status: booking.status || 'pending',
        totalAmount: booking.service?.price || 0
      }));

      setBookings(transformedBookings);
      setFilteredBookings(transformedBookings);
      setLoading(false);
    } catch (err) {
      console.error('Error loading bookings:', err);
      toast.error('Failed to load online bookings');
      setLoading(false);
    }
  };

  const handleSort = (field: 'date' | 'name' | 'amount') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Online Bookings</h1>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1"
                >
                  Customer
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1"
                >
                  Date
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-1"
                >
                  Amount
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{booking.customer.name}</div>
                  <div className="text-sm text-gray-500">{booking.customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.schedule.date && new Date(booking.schedule.date).toLocaleDateString()}
                  <div className="text-sm text-gray-500">{booking.schedule.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{booking.service.name}</div>
                  {booking.service.extras && booking.service.extras.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {booking.service.extras.length} extras
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {[booking.address.suburb, booking.address.city].filter(Boolean).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${booking.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => router.push(`/admin/jobs/${booking._id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/jobs/${booking._id}/edit`)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 