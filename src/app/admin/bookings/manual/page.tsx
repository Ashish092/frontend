'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Plus, Search, ArrowUpDown, Eye, Edit, Trash2 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ManualBooking {
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
  };
  services: Array<{
    name: string;
    amount: number;
    extras: Array<{
      price: number;
    }>;
  }>;
  status: string;
}

export default function ManualBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<ManualBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<ManualBooking[]>([]);
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
          const aTotal = calculateTotalAmount(a);
          const bTotal = calculateTotalAmount(b);
          compareResult = aTotal - bTotal;
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
      const response = await axios.get('http://localhost:5000/api/manual-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load bookings');
      console.error('Failed to load bookings', err);
      
      setLoading(false);
    }
  };

  const calculateTotalAmount = (booking: ManualBooking) => {
    return booking.services.reduce((total, service) => {
      const serviceTotal = service.amount;
      const extrasTotal = service.extras.reduce((sum, extra) => sum + extra.price, 0);
      return total + serviceTotal + extrasTotal;
    }, 0);
  };

  const handleSort = (field: 'date' | 'name' | 'amount') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/manual-bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Booking deleted successfully');
        fetchBookings();
      } catch (error) {
        console.error('Failed to delete booking', error);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manual Bookings</h1>
        <button
          onClick={() => router.push('/admin/bookings/manual/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Booking
        </button>
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(booking.schedule.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.address.suburb}, {booking.address.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${calculateTotalAmount(booking).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => router.push(`/admin/bookings/manual/${booking._id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/bookings/manual/${booking._id}/edit`)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
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