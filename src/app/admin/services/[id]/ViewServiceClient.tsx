'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    ArrowLeft, 
    Edit2, 
    Trash2, 
    Clock, 
    DollarSign,
    Tag,
    CheckCircle,
    XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminService {
    _id: string;
    name: string;
    description: string;
    duration: number;
    basePrice: number;
    priceType: 'fixed' | 'hourly';
    category: string;
    extras: Array<{
        name: string;
        price: number;
        description: string;
    }>;
    isActive: boolean;
    createdAt: string;
}

interface ViewServiceClientProps {
    id: string;
}

export default function ViewServiceClient({ id }: ViewServiceClientProps) {
    const router = useRouter();
    const [service, setService] = useState<AdminService | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchService = useCallback(async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/admin-services/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setService(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch service details:', error);
            toast.error('Failed to fetch service details');
            router.push('/admin/services');
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        fetchService();
    }, [fetchService]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(
                `http://localhost:5000/api/admin-services/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Service deleted successfully');
            router.push('/admin/services');
        } catch (error) {
            console.error('Failed to delete service:', error);
            toast.error('Failed to delete service');
        }
    };

    const categories = {
        regular: 'Regular Cleaning',
        deep: 'Deep Cleaning',
        end_of_lease: 'End of Lease',
        spring: 'Spring Cleaning',
        commercial: 'Commercial',
        other: 'Other Services'
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!service) {
        return null;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">{service.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.push(`/admin/services/${id}/edit`)}
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Service Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Description</label>
                                <p className="mt-1">{service.description}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Clock size={20} className="text-gray-400" />
                                    <span>{service.duration}h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={20} className="text-gray-400" />
                                    <span>
                                        ${service.basePrice}
                                        /{service.priceType === 'hourly' ? 'hr' : 'job'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag size={20} className="text-gray-400" />
                                    <span>{categories[service.category as keyof typeof categories]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extras */}
                    {service.extras.length > 0 && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Extra Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.extras.map((extra, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium">{extra.name}</h3>
                                            <span className="text-green-600">${extra.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{extra.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Status</h2>
                        <div className="flex items-center gap-2">
                            {service.isActive ? (
                                <>
                                    <CheckCircle className="text-green-500" size={20} />
                                    <span className="text-green-700">Active</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="text-red-500" size={20} />
                                    <span className="text-red-700">Inactive</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Created On</label>
                                <p className="mt-1">
                                    {new Date(service.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 