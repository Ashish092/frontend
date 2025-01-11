'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Search, 
    Plus,
    Mail,
    Phone,
    Eye,
    ArrowUpDown,
    Calendar,
    Clock,
    MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Booking {
    _id: string;
    bookingNo: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    address: {
        suburb: string;
        postcode: string;
    };
    schedule: {
        date: string;
        time: string;
    };
    service: {
        hours: number;
        amount: number;
    };
    status: string;
    tags: string[];
    createdAt: string;
}

export default function BookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortField, setSortField] = useState('schedule.date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                'http://localhost:5000/api/bookings',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setBookings(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            toast.error('Failed to fetch bookings');
        }
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedBookings = bookings
        .filter(booking => {
            const searchMatch = 
                booking.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.address.suburb.toLowerCase().includes(searchTerm.toLowerCase());
            
            const statusMatch = !statusFilter || booking.status === statusFilter;

            return searchMatch && statusMatch;
        })
        .sort((a, b) => {
            let compareA, compareB;

            switch (sortField) {
                case 'schedule.date':
                    compareA = new Date(a.schedule.date).getTime();
                    compareB = new Date(b.schedule.date).getTime();
                    break;
                case 'createdAt':
                    compareA = new Date(a.createdAt).getTime();
                    compareB = new Date(b.createdAt).getTime();
                    break;
                default:
                    compareA = a[sortField as keyof Booking];
                    compareB = b[sortField as keyof Booking];
            }

            return sortOrder === 'asc' 
                ? compareA > compareB ? 1 : -1
                : compareA < compareB ? 1 : -1;
        });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Bookings</h1>
                <button
                    onClick={() => router.push('/admin/jobs/new')}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Booking
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
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
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking Details
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('schedule.date')}
                            >
                                <div className="flex items-center gap-2">
                                    Schedule Date
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('createdAt')}
                            >
                                <div className="flex items-center gap-2">
                                    Created Date
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAndSortedBookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">#{booking.bookingNo}</span>
                                            <span className={`px-2 py-1 text-xs rounded-full
                                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                  'bg-red-100 text-red-800'}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-900">{booking.customer.name}</div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {booking.service.hours}h
                                            </span>
                                            <span>${booking.service.amount}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {booking.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Calendar size={16} />
                                        {new Date(booking.schedule.date).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {booking.schedule.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(booking.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        <div>
                                            <div className="text-sm text-gray-900">{booking.address.suburb}</div>
                                            <div className="text-sm text-gray-500">{booking.address.postcode}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-3">
                                        <button
                                            onClick={() => window.location.href = `mailto:${booking.customer.email}`}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Send Email"
                                        >
                                            <Mail size={16} />
                                        </button>
                                        <button
                                            onClick={() => window.location.href = `tel:${booking.customer.phone}`}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Call Customer"
                                        >
                                            <Phone size={16} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/admin/jobs/${booking._id}`)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
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