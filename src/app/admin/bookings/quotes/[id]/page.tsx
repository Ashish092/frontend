'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, Mail, Phone, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface QuoteDetails {
  _id: string;
  quoteId: string;
  serviceType: string;
  cleaningType: string;
  frequency: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  rateType: string;
  preferredDate: string;
  preferredTime: string;
  parkingAvailable: string;
  access: string;
  customer: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    suburb: string;
    state: string;
    postCode: string;
  };
  notes: string;
  status: string;
  createdAt: string;
}

export default function QuoteDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuoteDetails();
  }, []);

  const fetchQuoteDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch quote details');
      
      const data = await response.json();
      setQuote(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load quote details');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      const data = await response.json();
      setQuote(data.data);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!quote) {
    return <div className="p-6">Quote not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Quotes
        </button>
        <div className="flex gap-2">
          <select
            value={quote.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => router.push(`/admin/bookings/quotes/${params.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Quote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quote Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quote Information</h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-500">Quote ID:</span>
              <span className="ml-2 font-medium">{quote.quoteId}</span>
            </div>
            <div>
              <span className="text-gray-500">Service Type:</span>
              <span className="ml-2 font-medium">{quote.serviceType}</span>
            </div>
            <div>
              <span className="text-gray-500">Cleaning Type:</span>
              <span className="ml-2 font-medium">{quote.cleaningType}</span>
            </div>
            <div>
              <span className="text-gray-500">Frequency:</span>
              <span className="ml-2 font-medium">{quote.frequency}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <div className="font-medium">{quote.customer.name}</div>
                {quote.customer.companyName && (
                  <div className="text-sm text-gray-500">{quote.customer.companyName}</div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <span>{quote.customer.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <span>{quote.customer.phone}</span>
            </div>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span>{new Date(quote.preferredDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <span>{quote.preferredTime}</span>
            </div>
          </div>
        </div>

        {/* Property Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-500">Property Type:</span>
              <span className="ml-2 font-medium">{quote.propertyType}</span>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-gray-500">Bedrooms:</span>
                <span className="ml-2 font-medium">{quote.bedrooms}</span>
              </div>
              <div>
                <span className="text-gray-500">Bathrooms:</span>
                <span className="ml-2 font-medium">{quote.bathrooms}</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <span>
                {quote.address.street}, {quote.address.suburb}, {quote.address.state} {quote.address.postCode}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {quote.notes && (
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{quote.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
} 