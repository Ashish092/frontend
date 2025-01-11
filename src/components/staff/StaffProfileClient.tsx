'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Mail, Phone, MapPin, Calendar, 
    Clock, Save, X, Edit2, 
    ArrowLeft, User, Send,
    Award, FileText, Clock3
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Staff {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    title: string;
    department: string[];
    status: string;
    kioskCode: string;
    employmentStartDate: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
    };
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    documents: Array<{
        type: string;
        number: string;
        expiryDate: string;
        fileUrl: string;
    }>;
    notes: string;
    lastLogin: string;
}

export default function StaffProfileClient({ id }: { id: string }) {
    const router = useRouter();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('employment');

    useEffect(() => {
        fetchStaff();
    }, [id]);

    const fetchStaff = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/staffs/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setStaff(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch staff details');
            router.push('/admin/staffs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!staff) {
        return <div className="p-6">Staff not found</div>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Staff List
                    </button>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                        {staff.firstName[0]}{staff.lastName[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{staff.firstName} {staff.lastName}</h1>
                        <p className="text-gray-500">{staff.title}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/admin/staffs/${id}/edit`)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <Edit2 size={20} />
                        Edit
                    </button>
                    <button
                        onClick={() => window.location.href = `mailto:${staff.email}`}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Send size={20} />
                        Message
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b mb-6">
                <nav className="flex gap-6">
                    {['Employment', 'Activity', 'Time off', 'Notes', 'Forms', 'Documents', 'Timeline'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`py-4 px-2 relative ${
                                activeTab === tab.toLowerCase()
                                    ? 'text-blue-600 font-medium'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                            {activeTab === tab.toLowerCase() && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left Column - Employment Details */}
                <div className="col-span-2 space-y-6">
                    {activeTab === 'employment' && (
                        <>
                            {/* Pay Rate Section */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Pay rate</h2>
                                    <span className="text-gray-500 text-sm">
                                        Effective date: {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">Default rate</p>
                                        <p className="text-lg font-medium">$30/hour</p>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                                        View all rates
                                    </button>
                                </div>
                            </div>

                            {/* Scheduling Rules */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Scheduling rules</h2>
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Max hours per week</p>
                                        <p>25 hours</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Max hours per day</p>
                                        <p>8 hours</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Column - Personal Details */}
                <div className="space-y-6">
                    {/* Personal Details Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p>{staff.email}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p>{staff.phone}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Address</label>
                                <p>
                                    {staff.address.street}, {staff.address.city},
                                    <br />
                                    {staff.address.state} {staff.address.postcode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Related Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Company Related Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Title</label>
                                <p>{staff.title}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Department</label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {staff.department.map((dept) => (
                                        <span
                                            key={dept}
                                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                                        >
                                            {dept}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Employee ID</label>
                                <p>{staff.kioskCode}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Employment Start Date</label>
                                <p>{new Date(staff.employmentStartDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 