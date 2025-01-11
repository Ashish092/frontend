'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Service {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    isPopular: boolean;
    features: Array<{
        title: string;
        description: string;
    }>;
    longDescription: string;
}

interface FormData {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    isPopular: boolean;
    features: Array<{
        title: string;
        description: string;
    }>;
    longDescription: string;
}

export default function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<FormData>({
        id: '',
        title: '',
        description: '',
        price: '',
        image: '',
        isPopular: false,
        features: [],
        longDescription: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:5000/api/services', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(response.data);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Failed to fetch services:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            if (editingService) {
                await axios.put(
                    `http://localhost:5000/api/services/${editingService._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Service updated successfully');
            } else {
                await axios.post(
                    'http://localhost:5000/api/services',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Service created successfully');
            }
            fetchServices();
            setShowForm(false);
            setEditingService(null);
            resetForm();
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Failed to save service:', error);
            toast.error(error.response?.data?.message || 'Failed to save service');
        }
    };

    const handleDelete = async (serviceId: string) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Service deleted successfully');
            fetchServices();
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Failed to delete service:', error);
            toast.error(error.response?.data?.message || 'Failed to delete service');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            price: '',
            image: '',
            isPopular: false,
            features: [],
            longDescription: ''
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-8 h-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Services Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    Add New Service
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    {/* Form fields */}
                </form>
            )}

            {/* Services List */}
            <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Popular
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 relative">
                                                <Image
                                                    src={service.image || '/images/default-service.jpg'}
                                                    alt={service.title}
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {service.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {service.description.substring(0, 100)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {service.price}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {service.isPopular ? '✓' : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 