'use client'

import { Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '01:00 PM', available: true },
  { id: '6', time: '02:00 PM', available: true },
  { id: '7', time: '03:00 PM', available: false },
  { id: '8', time: '04:00 PM', available: true }
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function BookingDetails() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot.id)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isFormValid()) {
      try {
        const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedTime)
        const bookingDetails = {
          date: selectedDate,
          time: selectedTimeSlot?.time || '',
          ...formData
        }
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
        router.push('/quick-book/confirmation')
      } catch (error) {
        console.error('Error saving booking details:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Schedule Your Clean</h2>
        <p className="text-gray-600">Select your preferred date and time</p>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
              required
            />
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Time</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => handleTimeSelect(slot)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${!slot.available 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedTime === slot.id
                      ? 'bg-[#e6f0fa] text-[#1E3D8F] border-2 border-[#1E3D8F]'
                      : 'bg-white border border-gray-200 hover:border-[#90c2f7]'
                  }`}
              >
                <Clock className="w-4 h-4 inline-block mr-2" />
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1E3D8F] text-white py-3 rounded-lg font-medium
            hover:bg-opacity-90 transition-colors disabled:opacity-50"
          disabled={!isFormValid()}
        >
          Complete Booking
        </button>
      </div>
    </form>
  )
} 