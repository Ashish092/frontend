'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ArrowUpDown, Eye, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Quote {
  _id: string;
  quoteId: string;
  serviceType: string;
  cleaningType: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
  };
  address: {
    suburb: string;
    state: string;
  };
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
}

export default function QuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'date' | 'name'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filterAndSortQuotes = useCallback(() => {
    let filtered = [...quotes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(quote => 
        quote.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.quoteId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.customer.name.localeCompare(b.customer.name)
          : b.customer.name.localeCompare(a.customer.name);
      }
    });

    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, statusFilter, sortField, sortDirection]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    filterAndSortQuotes();
  }, [filterAndSortQuotes]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quotes');
      if (!response.ok) throw new Error('Failed to fetch quotes');
      
      const data = await response.json();
      setQuotes(data.data);
      setFilteredQuotes(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load quotes');
      setLoading(false);
    }
  };

  const handleSort = (field: 'date' | 'name') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search quotes..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1"
                >
                  Customer
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quote ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1"
                >
                  Date
                  <ArrowUpDown size={14} />
                </button>
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
            {filteredQuotes.map((quote) => (
              <tr key={quote._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{quote.customer.name}</div>
                  <div className="text-sm text-gray-500">{quote.customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quote.quoteId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{quote.cleaningType}</div>
                  <div className="text-sm text-gray-500">{quote.serviceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(quote.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => router.push(`/admin/bookings/quotes/${quote._id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => router.push(`/admin/bookings/quotes/${quote._id}/edit`)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 