'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Save, X, Plus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExtraService {
    name: string;
    price: number;
    description: string;
}

export default function NewServicePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [extras, setExtras] = useState<ExtraService[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: 2,
        basePrice: 0,
        priceType: 'fixed',
        category: 'regular'
    });

    const categories = [
        { value: 'regular', label: 'Regular Cleaning' },
        { value: 'deep', label: 'Deep Cleaning' },
        { value: 'end_of_lease', label: 'End of Lease' },
        { value: 'spring', label: 'Spring Cleaning' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'other', label: 'Other Services' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.post(
                'http://localhost:5000/api/admin-services',
                { ...formData, extras },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Service created successfully');
                router.push('/admin/services');
            }
        } catch (error) {
            toast.error('Failed to create service');
        } finally {
            setSaving(false);
        }
    };

    const addExtra = () => {
        setExtras([...extras, { name: '', price: 0, description: '' }]);
    };

    const removeExtra = (index: number) => {
        setExtras(extras.filter((_, i) => i !== index));
    };

    const updateExtra = (index: number, field: keyof ExtraService, value: string | number) => {
        const updatedExtras = [...extras];
        updatedExtras[index] = { ...updatedExtras[index], [field]: value };
        setExtras(updatedExtras);
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Add New Service</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Service Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>

                    {/* Pricing Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                min="0.5"
                                step="0.5"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Base Price
                            </label>
                            <input
                                type="number"
                                value={formData.basePrice}
                                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Price Type
                            </label>
                            <select
                                value={formData.priceType}
                                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            >
                                <option value="fixed">Fixed Price</option>
                                <option value="hourly">Hourly Rate</option>
                            </select>
                        </div>
                    </div>

                    {/* Extra Services */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Extra Services
                            </label>
                            <button
                                type="button"
                                onClick={addExtra}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus size={16} />
                                Add Extra
                            </button>
                        </div>
                        
                        {extras.map((extra, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-lg relative">
                                <button
                                    type="button"
                                    onClick={() => removeExtra(index)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                                >
                                    <X size={16} />
                                </button>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={extra.name}
                                        onChange={(e) => updateExtra(index, 'name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        value={extra.price}
                                        onChange={(e) => updateExtra(index, 'price', Number(e.target.value))}
                                        min="0"
                                        step="0.01"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={extra.description}
                                        onChange={(e) => updateExtra(index, 'description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            <Save size={20} />
                            {saving ? 'Creating...' : 'Create Service'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
} 