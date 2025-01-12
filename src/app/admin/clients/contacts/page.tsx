'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Search, 
    Plus, 
    Edit2, 
    Trash2, 
    Eye,
    UserPlus,
    Download,
    Upload,
    Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/config/api';

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    tags: string[];
    lastActivity: string;
}

export default function ContactsPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchContacts = useCallback(async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `${API_URL}/api/contacts?page=${page}&search=${searchTerm}&status=${statusFilter}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setContacts(response.data.data);
                setTotalPages(response.data.pagination.pages);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
            toast.error('Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, statusFilter]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success('Contact deleted successfully');
            fetchContacts();
        } catch (error) {
            console.error('Failed to delete contact:', error);
            toast.error('Failed to delete contact');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Contacts</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push('/admin/clients/contacts/new')}
                        className="btn-primary flex items-center gap-2"
                    >
                        <UserPlus size={20} />
                        Add New Contact
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
                                placeholder="Search contacts..."
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
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tags
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Activity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">
                                                    {contact.firstName[0]}{contact.lastName[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {contact.firstName} {contact.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{contact.email}</div>
                                    <div className="text-sm text-gray-500">{contact.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${contact.status === 'active' ? 'bg-green-100 text-green-800' : 
                                          contact.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                                          'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        {contact.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {contact.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(contact.lastActivity).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-3">
                                        <button
                                            onClick={() => router.push(`/admin/clients/contacts/${contact._id}`)}
                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                            title="View Contact"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/admin/clients/contacts/${contact._id}/edit`)}
                                            className="text-gray-600 hover:text-gray-900 transition-colors"
                                            title="Edit Contact"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="text-red-600 hover:text-red-900 transition-colors"
                                            title="Delete Contact"
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
                {contacts.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new contact.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => router.push('/admin/clients/contacts/new')}
                                className="btn-primary"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                New Contact
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Loading contacts...</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {contacts.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {contacts.length} contacts
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setPage(page => Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="btn-secondary"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-700">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page => Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="btn-secondary"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 