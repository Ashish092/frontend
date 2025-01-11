'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ContactData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
    createdAt: string;
}

interface NestedObject {
    [key: string]: string | number | NestedObject;
}

export default function ContactProfileClient({ id }: { id: string }) {
    const router = useRouter();
    const [data, setData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<Partial<ContactData>>({});
    const [saving, setSaving] = useState(false);

    const fetchContact = useCallback(async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/contacts/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(response.data);
            setLoading(false);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Failed to fetch contact:', error);
            toast.error('Failed to fetch contact details');
            router.push('/admin/clients/contacts');
        }
    }, [id, router]);

    useEffect(() => {
        fetchContact();
    }, [fetchContact]);

    const handleEdit = () => {
        setEditedData(data || {});
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedData(prev => ({
                ...prev,
                [parent]: {
                    ...((prev[parent as keyof ContactData] || {}) as NestedObject),
                    [child]: value
                }
            }));
        } else {
            setEditedData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.put(
                `http://localhost:5000/api/contacts/${id}`,
                editedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setData(response.data.data);
                setIsEditing(false);
                toast.success('Contact updated successfully');
            }
        } catch (error) {
            console.error('Failed to update contact:', error);
            toast.error('Failed to update contact');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({});
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!data) {
        return <div className="p-6">Contact not found</div>;
    }

    const displayData = isEditing ? editedData : data;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Contact Details</h1>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                            Edit Contact
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={displayData.name || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="mt-1">{displayData.name}</p>
                        )}
                    </div>
                    {/* Add other fields similarly */}
                </div>
            </div>
        </div>
    );
}
