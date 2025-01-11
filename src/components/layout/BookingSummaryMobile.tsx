'use client'

import { MapPin, Calendar, Clock, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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
}

interface Props {
  onClose: () => void
}

export default function BookingSummaryMobile({ onClose }: Props) {
  const [summaryData, setSummaryData] = useState<BookingSummaryData>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

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
        time: bookingDetails?.time
      })
    } catch (error) {
      console.error('Error updating summary:', error)
    }
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Booking Summary</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        {summaryData.suburb && (
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <p className="font-medium">{summaryData.suburb.name}</p>
              <p className="text-gray-500 text-sm">{summaryData.suburb.postcode}</p>
            </div>
          </div>
        )}

        {summaryData.service && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium mb-2">{summaryData.service.title}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration</span>
              <span>{summaryData.service.duration} hours</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">${summaryData.service.price}</span>
            </div>
          </div>
        )}

        {(summaryData.date || summaryData.time) && (
          <div className="flex flex-wrap gap-4 text-sm">
            {summaryData.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(summaryData.date).toLocaleDateString()}</span>
              </div>
            )}
            {summaryData.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{summaryData.time}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 