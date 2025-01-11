'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import BookingSummaryMobile from './BookingSummaryMobile'

export default function BookingHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-24 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Cleaning Professionals"
                width={160}
                height={80}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Contact Info */}
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-500">Need Help?</p>
              <div className="flex items-center gap-4">
                <a 
                  href="tel:0450124086" 
                  className="flex items-center gap-2 text-[#1E3D8F] hover:text-[#0854ac] font-medium"
                >
                  0450 124 086
                </a>
                <a 
                  href="mailto:account@cleaningprofessionals.com.au"
                  className="flex items-center gap-2 text-[#1E3D8F] hover:text-[#0854ac] font-medium"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Mobile Summary Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden flex items-center gap-2 py-2 px-3 rounded-lg border border-gray-200"
            >
              <span className="text-[#1E3D8F] font-medium">View Summary</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                  ${showMobileMenu ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Summary Dropdown */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setShowMobileMenu(false)}>
          <div 
            className="fixed top-24 left-0 right-0 bg-white shadow-lg animate-slideDown"
            onClick={e => e.stopPropagation()}
          >
            <BookingSummaryMobile onClose={() => setShowMobileMenu(false)} />
          </div>
        </div>
      )}
    </>
  )
} 