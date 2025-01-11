'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, 
    Calendar,
    ClipboardList,
    DollarSign,
    Loader2
} from 'lucide-react';

interface Stats {
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    totalRevenue: number;
    recentBookings: Array<{
        reference: string;
        customer: {
            firstName: string;
            lastName: string;
        };
        service: {
            title: string;
            price: number;
        };
        schedule: {
            date: string;
            time: string;
        };
        status: string;
    }>;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:5000/api/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data.data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching stats:', err);
            setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Bookings"
                    value={stats?.totalBookings || 0}
                    icon={<Calendar className="w-6 h-6" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Pending Bookings"
                    value={stats?.pendingBookings || 0}
                    icon={<ClipboardList className="w-6 h-6" />}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Completed Jobs"
                    value={stats?.completedBookings || 0}
                    icon={<Users className="w-6 h-6" />}
                    color="bg-green-500"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${stats?.totalRevenue || 0}`}
                    icon={<DollarSign className="w-6 h-6" />}
                    color="bg-purple-500"
                />
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">Recent Bookings</h2>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="pb-3">Reference</th>
                                    <th className="pb-3">Customer</th>
                                    <th className="pb-3">Service</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentBookings.map((booking) => (
                                    <tr key={booking.reference} className="border-b">
                                        <td className="py-3">{booking.reference}</td>
                                        <td className="py-3">
                                            {booking.customer.firstName} {booking.customer.lastName}
                                        </td>
                                        <td className="py-3">{booking.service.title}</td>
                                        <td className="py-3">
                                            {new Date(booking.schedule.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs
                                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                                                ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                                                ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                            `}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-3">${booking.service.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
                <div className={`${color} text-white p-3 rounded-lg`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-gray-500 text-sm">{title}</h3>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
} 