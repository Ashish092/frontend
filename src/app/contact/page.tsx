'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['0450124086'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: [
      'info@cleaningprofessionals.com.au',
      'account@cleaningprofessionals.com.au'
    ],
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['Melbourne, Victoria 3000', 'Australia'],
  },
  {
    icon: Clock,
    title: 'Open Times',
    details: [
      'Mon - Fri: 8am - 8pm',
      'Saturday: 9am - 7pm',
      'Sunday: 9am - 8pm'
    ],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 mt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map(({ icon: Icon, title, details }) => (
              <div key={title} className="flex space-x-4">
                <Icon size={24} className="text-[#1E3D8F] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  {details.map((detail) => (
                    <p key={detail} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border rounded-md"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-md"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full p-3 border rounded-md"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#1E3D8F] text-white px-8 py-3 rounded-md hover:bg-opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 