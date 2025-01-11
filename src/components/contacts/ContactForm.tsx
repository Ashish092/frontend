'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ContactFormProps {
    id?: string;
    initialData?: ContactData;
}

interface ContactData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
}

export default function ContactForm({ id, initialData }: ContactFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<ContactData>(() => {
        if (initialData) {
            return initialData;
        }
        return {
            _id: '',
            name: '',
            email: '',
            phone: '',
            company: '',
            notes: ''
        };
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = id 
                ? `http://localhost:5000/api/contacts/${id}`
                : 'http://localhost:5000/api/contacts';
            
            const method = id ? 'put' : 'post';
            
            const response = await axios[method](
                url,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success(id ? 'Contact updated successfully' : 'Contact created successfully');
                router.push('/admin/clients/contacts');
            }
        } catch (error) {
            console.error('Failed to save contact:', error);
            toast.error('Failed to save contact');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Contacts
                </button>
                <h1 className="text-2xl font-bold">{id ? 'Edit Contact' : 'Add New Contact'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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
                        <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows={4}
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
                        {saving ? 'Saving...' : (id ? 'Update Contact' : 'Create Contact')}
                    </button>
                </div>
            </form>
        </div>
    );
} 