'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

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

export default function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({
        id: '',
        title: '',
        description: '',
        price: '',
        image: '',
        isPopular: false,
        features: [{ title: '', description: '' }],
        longDescription: ''
    });

    // Fetch services
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            if (response.data.success) {
                setServices(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Prepare form data, using default image if none provided
            const submitData = {
                ...formData,
                image: formData.image || '/images/default-service.jpg'
            };

            if (editingService) {
                await axios.put(
                    `http://localhost:5000/api/services/${editingService.id}`,
                    submitData,
                    config
                );
                toast.success('Service updated successfully');
            } else {
                await axios.post(
                    'http://localhost:5000/api/services',
                    submitData,
                    config
                );
                toast.success('Service created successfully');
            }

            // Reset form and refresh services
            setShowForm(false);
            setEditingService(null);
            setFormData({
                id: '',
                title: '',
                description: '',
                price: '',
                image: '',
                isPopular: false,
                features: [{ title: '', description: '' }],
                longDescription: ''
            });
            fetchServices();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    // Handle service deletion
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
        } catch (error) {
            toast.error('Failed to delete service');
        }
    };

    // Handle edit button click
    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            id: service.id,
            title: service.title,
            description: service.description,
            price: service.price,
            image: service.image,
            isPopular: service.isPopular,
            features: service.features,
            longDescription: service.longDescription
        });
        setShowForm(true);
    };

    // Handle adding/removing feature fields
    const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...(formData.features || []), { title: '', description: '' }]
        });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features?.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
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
                    <Plus size={20} />
                    Add New Service
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingService ? 'Edit Service' : 'Add New Service'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Service ID</label>
                                <input
                                    type="text"
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Price</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">
                                    Image URL 
                                    <span className="text-gray-500 text-sm ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="/images/default-service.jpg"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Leave empty for default image
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Short Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={2}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Long Description</label>
                            <textarea
                                value={formData.longDescription}
                                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-semibold">Features</label>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    + Add Feature
                                </button>
                            </div>
                            {formData.features?.map((feature, index) => (
                                <div key={index} className="flex gap-4 mb-2">
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                        placeholder="Feature Title"
                                        className="w-1/3 p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        value={feature.description}
                                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                        placeholder="Feature Description"
                                        className="w-2/3 p-2 border rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.isPopular}
                                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                id="isPopular"
                            />
                            <label htmlFor="isPopular">Mark as Popular</label>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingService(null);
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Service'}
                            </button>
                        </div>
                    </form>
                </div>
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
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={service.image || '/images/default-service.jpg'}
                                                    alt={service.title}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/images/default-service.jpg';
                                                    }}
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
                                            onClick={() => handleEdit(service)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Pencil size={16} />
                                        </button>
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