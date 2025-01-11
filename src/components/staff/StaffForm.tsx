'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface StaffFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    title: string;
    department: string[];
    status: string;
    staffId: string;
    employmentStartDate: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
    };
}

interface NestedObject {
    [key: string]: string | number | boolean | NestedObject;
}

export default function StaffForm({ id }: { id?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(id ? true : false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<StaffFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        title: '',
        department: [],
        status: 'active',
        staffId: '',
        employmentStartDate: new Date().toISOString().split('T')[0],
        address: {
            street: '',
            city: '',
            state: '',
            postcode: ''
        }
    });

    const fetchStaff = useCallback(async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/staffs/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                const staff = response.data.data;
                setFormData({
                    ...staff,
                    staffId: staff.kioskCode,
                    employmentStartDate: new Date(staff.employmentStartDate).toISOString().split('T')[0]
                });
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            console.error('Error fetching staff:', error);
            toast.error('Failed to fetch staff details');
            router.push('/admin/staffs');
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        if (id) {
            fetchStaff();
        }
    }, [id, fetchStaff]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof StaffFormData] as NestedObject),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const submitData = {
            ...formData,
            kioskCode: formData.staffId
        };

        try {
            const token = localStorage.getItem('adminToken');
            const url = id 
                ? `http://localhost:5000/api/staffs/${id}`
                : 'http://localhost:5000/api/staffs';
            const method = id ? 'put' : 'post';

            const response = await axios[method](
                url,
                submitData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success(`Staff ${id ? 'updated' : 'created'} successfully`);
                router.push('/admin/staffs');
            }
        } catch (error) {
            console.error('Error saving staff:', error);
            toast.error(`Failed to ${id ? 'update' : 'create'} staff`);

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Staff List
                </button>
                <h1 className="text-2xl font-bold">{id ? 'Edit Staff' : 'Add New Staff'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Staff ID</label>
                            <input
                                type="text"
                                name="staffId"
                                value={formData.staffId}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Employment Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Employment Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department.join(', ')}
                                onChange={handleInputChange}
                                placeholder="Separate departments with commas"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="on_leave">On Leave</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                name="employmentStartDate"
                                value={formData.employmentStartDate}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Street</label>
                            <input
                                type="text"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                                type="text"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">State</label>
                            <input
                                type="text"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Postcode</label>
                            <input
                                type="text"
                                name="address.postcode"
                                value={formData.address.postcode}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save size={20} />
                        {saving ? 'Saving...' : id ? 'Save Changes' : 'Create Staff'}
                    </button>
                </div>
            </form>
        </div>
    );
} 