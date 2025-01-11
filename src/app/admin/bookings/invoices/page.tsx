'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
    Search, 
    Filter,
    Download,
    Mail,
    Eye,
    Plus,
    ArrowUpDown,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Invoice } from '@/types/invoice';

export default function BookingInvoicesPage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                'http://localhost:5000/api/invoices',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setInvoices(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch invoices');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            case 'sent':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleSendInvoice = async (invoiceId: string) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(
                `http://localhost:5000/api/invoices/${invoiceId}/send`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Invoice sent successfully');
            fetchInvoices();
        } catch (error) {
            toast.error('Failed to send invoice');
        }
    };

    const handleDownloadInvoice = async (invoiceId: string) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/invoices/${invoiceId}/download`,
                { 
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob'
                }
            );
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${invoiceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error('Failed to download invoice');
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const searchMatch = 
            invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const statusMatch = !statusFilter || invoice.status === statusFilter;
        
        const dateMatch = !dateFilter || new Date(invoice.createdAt).toISOString().split('T')[0] === dateFilter;

        return searchMatch && statusMatch && dateMatch;
    }).sort((a, b) => {
        const aValue = a[sortField as keyof Invoice];
        const bValue = b[sortField as keyof Invoice];
        const order = sortOrder === 'asc' ? 1 : -1;
        return aValue > bValue ? order : -order;
    });

    const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const paidAmount = filteredInvoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.total, 0);
    const overdueAmount = filteredInvoices
        .filter(invoice => invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoice.total, 0);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Invoices</h1>
                <button
                    onClick={() => router.push('/admin/bookings/invoices/new')}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create Invoice
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Outstanding</p>
                            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Paid</p>
                            <p className="text-2xl font-bold">${paidAmount.toFixed(2)}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Overdue</p>
                            <p className="text-2xl font-bold">${overdueAmount.toFixed(2)}</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search invoices..."
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
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                    </select>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    />
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('invoiceNo')}
                            >
                                <div className="flex items-center gap-2">
                                    Invoice
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('total')}
                            >
                                <div className="flex items-center gap-2">
                                    Amount
                                    <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('dueDate')}
                            >
                                <div className="flex items-center gap-2">
                                    Due Date
                                    <ArrowUpDown size={14} />
                                </div>
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
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        #{invoice.invoiceNo}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(invoice.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{invoice.customer.name}</div>
                                    <div className="text-sm text-gray-500">{invoice.customer.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        ${invoice.total.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Inc. GST
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="text-sm text-gray-900">
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-3">
                                        <button
                                            onClick={() => handleSendInvoice(invoice._id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Send Invoice"
                                        >
                                            <Mail size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDownloadInvoice(invoice._id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Download Invoice"
                                        >
                                            <Download size={16} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/admin/bookings/invoices/${invoice._id}`)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {filteredInvoices.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new invoice.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => router.push('/admin/bookings/invoices/new')}
                                className="btn-primary"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Invoice
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading invoices...</p>
                    </div>
                )}
            </div>
        </div>
    );
} 