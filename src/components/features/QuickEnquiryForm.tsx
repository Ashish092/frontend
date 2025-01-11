'use client'

import { useState } from 'react'

export default function QuickEnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'General House Cleaning'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Quick Enquiry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Your Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 border rounded-lg bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Choose a Service</label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full p-3 border rounded-lg bg-gray-50"
            required
          >
            <option value="General House Cleaning">General House Cleaning</option>
            <option value="End of Lease Cleaning">End of Lease Cleaning</option>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Window Cleaning">Window Cleaning</option>
            <option value="Commercial Cleaning">Commercial Cleaning</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FFA500] text-white py-3 rounded-lg hover:bg-opacity-90 font-semibold"
        >
          SUBMIT DETAILS
        </button>
      </form>
    </div>
  )
} 