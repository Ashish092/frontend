'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { 
    Search,    
    UserPlus, 
    Edit2, 
    Trash2, 
    Eye,
    Download,
    Upload,
    Loader2
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
    kioskCode: string;
    status: 'active' | 'inactive' | 'on_leave';
}

export default function StaffsPage() {
    const router = useRouter();
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [page] = useState(1);
    

    useEffect(() => {
        fetchStaffs();
    }, [page, statusFilter, departmentFilter]);

    const fetchStaffs = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                'http://localhost:5000/api/staffs',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setStaffs(response.data.data);
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Failed to fetch staff members:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch staff members');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.delete(
                    `http://localhost:5000/api/staffs/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    toast.success('Staff member deleted successfully');
                    fetchStaffs();
                }
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                console.error('Failed to delete staff member:', error);
                toast.error(error.response?.data?.message || 'Failed to delete staff member');
            }
        }
    };

    const filteredStaffs = staffs.filter(staff => {
        const searchMatch = 
            staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.kioskCode.toLowerCase().includes(searchTerm.toLowerCase());
        
        const statusMatch = !statusFilter || staff.status === statusFilter;
        const departmentMatch = !departmentFilter || staff.department.includes(departmentFilter);

        return searchMatch && statusMatch && departmentMatch;
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Staff Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push('/admin/staffs/new')}
                        className="btn-primary flex items-center gap-2"
                    >
                        <UserPlus size={20} />
                        Add New Staff
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                        <Upload size={20} />
                        Import
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                        <Download size={20} />
                        Export
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search staff..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border rounded-lg"
                            />
                        </div>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on_leave">On Leave</option>
                    </select>
                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">All Departments</option>
                        <option value="Service">Service</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
            </div>

            {/* Staff Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Staff Member
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Staff ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStaffs.map((staff) => (
                            <tr key={staff._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                            {staff.firstName[0]}{staff.lastName[0]}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {staff.firstName} {staff.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {staff.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {staff.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-wrap gap-1">
                                        {staff.department.map((dept) => (
                                            <span
                                                key={dept}
                                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                                            >
                                                {dept}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {staff.kioskCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full
                                        ${staff.status === 'active' ? 'bg-green-100 text-green-800' :
                                          staff.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                          'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        {staff.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-3">
                                        <button
                                            onClick={() => router.push(`/admin/staffs/${staff._id}`)}
                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                            title="View Staff"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/admin/staffs/${staff._id}/edit`)}
                                            className="text-gray-600 hover:text-gray-900 transition-colors"
                                            title="Edit Staff"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(staff._id)}
                                            className="text-red-600 hover:text-red-900 transition-colors"
                                            title="Delete Staff"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {staffs.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No staff members</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a new staff member.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => router.push('/admin/staffs/new')}
                                className="btn-primary"
                            >
                                <UserPlus className="w-5 h-5 mr-2" />
                                Add New Staff
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Loading staff members...</p>
                    </div>
                )}
            </div>
        </div>
    );
} 