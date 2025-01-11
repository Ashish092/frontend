'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapPin, Calendar, Clock } from 'lucide-react'

interface BookingSummaryData {
  suburb?: {
    name: string
    postcode: string
  }
  service?: {
    title: string
    price: number
    duration: number
  }
  date?: string
  time?: string
  contact?: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export default function BookingSummary() {
  const pathname = usePathname()
  const [summaryData, setSummaryData] = useState<BookingSummaryData>({})

  useEffect(() => {
    const updateSummary = () => {
      try {
        const getLocalStorageItem = (key: string) => {
          try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
          } catch {
            return null
          }
        }

        const selectedSuburb = getLocalStorageItem('selectedSuburb')
        const selectedService = getLocalStorageItem('selectedService')
        const bookingDetails = getLocalStorageItem('bookingDetails')

        setSummaryData({
          suburb: selectedSuburb,
          service: selectedService,
          date: bookingDetails?.date,
          time: bookingDetails?.time,
          contact: bookingDetails ? {
            firstName: bookingDetails.firstName,
            lastName: bookingDetails.lastName,
            email: bookingDetails.email,
            phone: bookingDetails.phone
          } : undefined
        })
      } catch (error) {
        console.error('Error updating summary:', error)
      }
    }

    // Update immediately
    updateSummary()

    // Set up storage event listener for real-time updates
    const handleStorageChange = () => updateSummary()
    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  const isConfirmationPage = pathname === '/quick-book/confirmation'

  if (!summaryData.suburb && !summaryData.service && !summaryData.date) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-gray-50 border-l border-gray-200 pt-24 px-6
      hidden md:block">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Booking Summary</h2>

        {/* Location */}
        {summaryData.suburb && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">{summaryData.suburb.name}</p>
                <p className="text-sm text-gray-500">{summaryData.suburb.postcode}</p>
              </div>
            </div>
          </div>
        )}

        {/* Service */}
        {summaryData.service && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Service</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium mb-2">{summaryData.service.title}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span>{summaryData.service.duration} hours</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                <span className="text-gray-500">Total</span>
                <span className="text-lg font-semibold">${summaryData.service.price}</span>
              </div>
            </div>
          </div>
        )}

        {/* Date & Time */}
        {(summaryData.date || summaryData.time) && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Schedule</h3>
            <div className="space-y-3">
              {summaryData.date && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="font-medium">{formatDate(summaryData.date)}</p>
                </div>
              )}
              {summaryData.time && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="font-medium">{summaryData.time}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {summaryData.contact && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Details</h3>
            <div className="space-y-2">
              <p className="font-medium">
                {summaryData.contact.firstName} {summaryData.contact.lastName}
              </p>
              <p className="text-sm text-gray-500">{summaryData.contact.email}</p>
              <p className="text-sm text-gray-500">{summaryData.contact.phone}</p>
            </div>
          </div>
        )}

        {!isConfirmationPage && summaryData.service && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total Price</span>
              <span className="text-xl font-semibold">${summaryData.service.price}</span>
            </div>
            <p className="text-sm text-gray-500">
              Final price includes all taxes and fees
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 