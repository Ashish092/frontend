'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2,
    DollarSign,
    Clock,
    Tag,
    Eye
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
}

export default function AdminServicesPage() {
    const router = useRouter();
    const [services, setServices] = useState<AdminService[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                'http://localhost:5000/api/admin-services',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setServices(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
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
            fetchServices();
        } catch (error) {
            console.error('Failed to delete service:', error);
            toast.error('Failed to delete service');
        }
    };

    const filteredServices = services.filter(service => {
        const searchMatch = 
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const categoryMatch = !categoryFilter || service.category === categoryFilter;

        return searchMatch && categoryMatch;
    });

    const categories = [
        { value: 'regular', label: 'Regular Cleaning' },
        { value: 'deep', label: 'Deep Cleaning' },
        { value: 'end_of_lease', label: 'End of Lease' },
        { value: 'spring', label: 'Spring Cleaning' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'other', label: 'Other Services' }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Services</h1>
                <button
                    onClick={() => router.push('/admin/services/new')}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Service
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border rounded-lg"
                            />
                        </div>
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <div key={service._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{service.name}</h3>
                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                        {categories.find(c => c.value === service.category)?.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/services/${service._id}`)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => router.push(`/admin/services/${service._id}/edit`)}
                                        className="text-gray-600 hover:text-blue-600"
                                        title="Edit Service"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="text-gray-600 hover:text-red-600"
                                        title="Delete Service"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    {service.duration}h
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign size={16} />
                                    {service.basePrice}
                                    <span className="text-xs">
                                        /{service.priceType === 'hourly' ? 'hr' : 'fixed'}
                                    </span>
                                </div>
                            </div>
                            {service.extras.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-sm font-medium mb-2">Extras Available:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {service.extras.map((extra, index) => (
                                            <span 
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                                            >
                                                <Tag size={12} />
                                                {extra.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Tag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new service.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => router.push('/admin/services/new')}
                            className="btn-primary"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Service
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading services...</p>
                </div>
            )}
        </div>
    );
} 