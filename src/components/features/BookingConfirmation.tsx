'use client'

import { Calendar, Clock, MapPin, Check, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface BookingData {
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  service?: {
    id: string
    title: string
    price: number
    duration: number
  }
  suburb?: {
    name: string
    postcode: string
  }
}

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

export default function BookingConfirmation() {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reference] = useState(`BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)
  const [isSaving, setIsSaving] = useState(false)
  const [bookingNo, setBookingNo] = useState(`BK${Date.now()}${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    try {
      const getLocalStorageItem = (key: string) => {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item) : null
        } catch (error) {
          console.error(`Error parsing ${key}:`, error)
          setError(`Unable to load booking information. Please try again.`)
          return null
        }
      }

      const bookingDetails = getLocalStorageItem('bookingDetails')
      const selectedService = getLocalStorageItem('selectedService')
      const selectedSuburb = getLocalStorageItem('selectedSuburb')

      if (!bookingDetails?.date || !bookingDetails?.time || !selectedService || !selectedSuburb) {
        console.error('Missing required booking data')
        setError('Your booking information is incomplete. Please start over.')
        router.push('/quick-book')
        return
      }

      setBooking({
        ...bookingDetails,
        service: selectedService,
        suburb: selectedSuburb
      })

    } catch (error) {
      console.error('Error setting up booking:', error)
      setError('We encountered an issue loading your booking. Please try again.')
      router.push('/quick-book')
    }
  }, [router])

  useEffect(() => {
    const saveBookingToDatabase = async () => {
      if (!booking) return;
      
      setIsSaving(true);
      try {
        const response = await fetch('http://localhost:5000/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bookingNo,
            reference,
            service: booking.service,
            suburb: booking.suburb,
            customer: {
              firstName: booking.firstName,
              lastName: booking.lastName,
              email: booking.email,
              phone: booking.phone
            },
            schedule: {
              date: booking.date,
              time: booking.time
            },
            status: 'pending',
            totalAmount: booking.service?.price || 0
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save booking');
        }

        // Clear localStorage after successful save
        localStorage.removeItem('bookingDetails');
        localStorage.removeItem('selectedService');
        localStorage.removeItem('selectedSuburb');

      } catch (error: any) {
        console.error('Error saving booking:', error);
        setError('Failed to save your booking. Please try again.');
        throw error;
      } finally {
        setIsSaving(false);
      }
    };

    if (booking) {
      saveBookingToDatabase().catch(error => {
        console.error('Failed to save booking:', error);
        setError('Failed to save your booking. Please try again.');
      });
    }
  }, [booking, reference, bookingNo]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateStr
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4 text-4xl">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/quick-book"
            className="text-[#1E3D8F] hover:text-opacity-80 font-medium"
          >
            Return to Booking Start
          </Link>
        </div>
      </div>
    )
  }

  if (!booking || isSaving) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F] mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isSaving ? 'Confirming your booking...' : 'Loading your booking details...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your booking reference is: <span className="font-medium">{reference}</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Booking Details</h3>
        <div className="space-y-4">
          {booking.suburb && (
            <DetailItem
              icon={<MapPin className="w-5 h-5" />}
              label="Location"
              value={`${booking.suburb.name} ${booking.suburb.postcode}`}
            />
          )}
          <DetailItem
            icon={<Calendar className="w-5 h-5" />}
            label="Date"
            value={formatDate(booking.date)}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5" />}
            label="Time"
            value={booking.time}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Service Details</h3>
        <div className="space-y-4">
          {booking.service && (
            <>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Service Type</span>
                <span className="font-medium">{booking.service.title}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{booking.service.duration} hours</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Price</span>
                <span className="text-xl font-semibold">${booking.service.price}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <DetailItem
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value={booking.email}
          />
          <DetailItem
            icon={<Phone className="w-5 h-5" />}
            label="Phone"
            value={booking.phone}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/quick-book"
          className="flex-1 text-center py-3 border border-[#1E3D8F] text-[#1E3D8F] 
            rounded-lg font-medium hover:bg-[#e6f0fa] transition-colors"
        >
          Book Another Clean
        </Link>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-[#1E3D8F] text-white py-3 rounded-lg font-medium
            hover:bg-opacity-90 transition-colors"
        >
          Print Confirmation
        </button>
      </div>
    </div>
  )
} 