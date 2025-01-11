'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface QuoteFormData {
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
}

export default function EditQuotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: '',
    cleaningType: '',
    frequency: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    rateType: '',
    preferredDate: '',
    preferredTime: '',
    parkingAvailable: '',
    access: '',
    customer: {
      name: '',
      companyName: '',
      email: '',
      phone: '',
    },
    address: {
      street: '',
      suburb: '',
      state: '',
      postCode: '',
    },
    notes: '',
    status: ''
  });

  useEffect(() => {
    fetchQuoteDetails();
  }, []);

  const fetchQuoteDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch quote details');
      
      const data = await response.json();
      setFormData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load quote details');
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    section?: string
  ) => {
    const { name, value } = e.target;
    
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof QuoteFormData],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update quote');
      
      toast.success('Quote updated successfully');
      router.push(`/admin/bookings/quotes/${params.id}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update quote');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Edit Quote</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Type</label>
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cleaning Type</label>
              <input
                type="text"
                name="cleaningType"
                value={formData.cleaningType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Frequency</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="one-time">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.customer.name}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.customer.companyName}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.customer.email}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.customer.phone}
                onChange={(e) => handleInputChange(e, 'customer')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Suburb</label>
              <input
                type="text"
                name="suburb"
                value={formData.address.suburb}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.address.state}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="VIC">VIC</option>
                <option value="NSW">NSW</option>
                <option value="QLD">QLD</option>
                <option value="WA">WA</option>
                <option value="SA">SA</option>
                <option value="TAS">TAS</option>
                <option value="ACT">ACT</option>
                <option value="NT">NT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Post Code</label>
              <input
                type="text"
                name="postCode"
                value={formData.address.postCode}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded-lg resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 