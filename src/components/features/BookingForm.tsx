'use client'

import { useState } from 'react'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-2xl font-bold text-[#333333] mb-6">Request a Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md bg-[#F5F5F5]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md bg-[#F5F5F5]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-md bg-[#F5F5F5]"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-md bg-[#F5F5F5]"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FFA500] text-white py-3 rounded-md hover:bg-opacity-90 font-semibold"
        >
          REQUEST A QUOTE
        </button>
      </form>
    </div>
  )
} 