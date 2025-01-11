'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Mail, Phone, MapPin, Calendar, 
    Clock, Save, X, Edit2, 
    ArrowLeft, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    status: string;
    source: string;
    tags: string[];
    notes: string;
    bookingHistory: Array<{
        _id: string;
        reference: string;
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
    lastActivity: string;
    createdAt: string;
}

interface ActivityLog {
    type: 'invoice_paid' | 'email_clicked' | 'invoice_sent';
    description: string;
    amount?: number;
    date: string;
    link?: string;
}

export default function ContactProfileClient({ id }: { id: string }) {
    const router = useRouter();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<Partial<Contact>>({});
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        fetchContact();
    }, [id]);

    const fetchContact = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/contacts/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setContact(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch contact details');
            router.push('/admin/clients/contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setEditedData(contact || {});
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditedData({});
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
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
                setContact(response.data.data);
                setIsEditing(false);
                toast.success('Contact updated successfully');
            }
        } catch (error) {
            toast.error('Failed to update contact');
        } finally {
            setSaving(false);
        }
    };

    const handleAddTag = () => {
        if (newTag && !editedData.tags?.includes(newTag)) {
            setEditedData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), newTag]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setEditedData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
        }));
    };

    const handleEmailClick = () => {
        if (contact?.email) {
            window.location.href = `mailto:${contact.email}`;
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!contact) {
        return <div className="p-6">Contact not found</div>;
    }

    const data = isEditing ? editedData : contact;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Contacts
                </button>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="btn-secondary flex items-center gap-2"
                                disabled={saving}
                            >
                                <X size={20} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn-primary flex items-center gap-2"
                                disabled={saving}
                            >
                                <Save size={20} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEmailClick}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Mail size={20} />
                                Email Contact
                            </button>
                            <button
                                onClick={handleEdit}
                                className="btn-secondary flex items-center gap-2"
                            >
                                <Edit2 size={20} />
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                                {data.firstName?.[0]}{data.lastName?.[0]}
                            </div>
                            <div className="ml-4 flex-1">
                                {isEditing ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editedData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editedData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="text-2xl font-bold">
                                            {data.firstName} {data.lastName}
                                        </h1>
                                        <div className="flex items-center mt-1 text-gray-500">
                                            <span>Client since {new Date(data.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {isEditing ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editedData.phone}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={editedData.status}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg px-3 py-2"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={editedData.address?.street}
                                                onChange={handleInputChange}
                                                placeholder="Street"
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                            <input
                                                type="text"
                                                name="address.city"
                                                value={editedData.address?.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                            <input
                                                type="text"
                                                name="address.state"
                                                value={editedData.address?.state}
                                                onChange={handleInputChange}
                                                placeholder="State"
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                            <input
                                                type="text"
                                                name="address.postcode"
                                                value={editedData.address?.postcode}
                                                onChange={handleInputChange}
                                                placeholder="Postcode"
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                        <div>
                                            <div className="text-sm text-gray-500">Primary email</div>
                                            <div>{data.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-gray-400 mr-2" />
                                        <div>
                                            <div className="text-sm text-gray-500">Primary phone</div>
                                            <div>{data.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center col-span-2">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                        <div>
                                            <div className="text-sm text-gray-500">Home address</div>
                                            <div>
                                                {data.address?.street}, {data.address?.city},
                                                {data.address?.state} {data.address?.postcode}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Booking History */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Booking History</h2>
                        <div className="space-y-4">
                            {data.bookingHistory?.map((booking) => (
                                <div key={booking._id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{booking.service.title}</h3>
                                            <div className="text-sm text-gray-500 mt-1">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(booking.schedule.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {booking.schedule.time}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">${booking.service.price}</div>
                                            <span className={`px-2 py-1 text-xs rounded-full
                                                ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                  'bg-yellow-100 text-yellow-800'}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Additional Info */}
                <div className="space-y-6">
                    {/* Notes */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Notes</h2>
                        {isEditing ? (
                            <textarea
                                name="notes"
                                value={editedData.notes}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Add notes about this contact..."
                            />
                        ) : (
                            <p className="text-gray-600">{data.notes || 'No notes added'}</p>
                        )}
                    </div>

                    {/* Labels/Tags */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Labels</h2>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Add new tag"
                                        className="border rounded-lg px-3 py-1 text-sm"
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.tags?.map((tag) => (
                                <span 
                                    key={tag} 
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                                >
                                    {tag}
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Source</label>
                                <p>{data.source}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Last Activity</label>
                                <p>{new Date(data.lastActivity).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 