'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1E3D8F] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Logo and Description */}
          <div className="md:col-span-1">
            <Image 
              src="/logos/logo-white.png"
              alt="Cleaning Professionals" 
              width={200} 
              height={80}
              className="mb-6 w-[160px] md:w-[200px]"
            />
            <p className="text-sm md:text-base text-gray-300 mb-6">
              Cleaning Professionals stands as a beacon of excellence in household and commercial cleaning services across the Melbourne area
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <p className="text-gray-300">Email:</p>
              <a href="mailto:info@cleaningprofessionals.com.au" className="text-white hover:text-[#FFA500] text-sm md:text-base">
                info@cleaningprofessionals.com.au
              </a>
              <a href="mailto:account@cleaningprofessionals.com.au" className="block text-white hover:text-[#FFA500] text-sm md:text-base">
                account@cleaningprofessionals.com.au
              </a>
              <p className="text-gray-300 mt-4">Phone: <a href="tel:0450124086" className="text-white hover:text-[#FFA500]">0450124086</a></p>
            </div>
            <div className="flex gap-4 mt-6">
              <Link href="https://facebook.com" className="text-white hover:text-[#FFA500] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </Link>
              <Link href="https://instagram.com" className="text-white hover:text-[#FFA500] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-white hover:text-[#FFA500] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="https://wa.me/0450124086" className="text-white hover:text-[#FFA500] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li><Link href="/" className="hover:text-[#FFA500]">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FFA500]">About</Link></li>
              <li><Link href="/services" className="hover:text-[#FFA500]">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-[#FFA500]">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-[#FFA500]">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFA500]">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li><Link href="/services/carpet-cleaning" className="hover:text-[#FFA500]">Carpet Cleaning</Link></li>
              <li><Link href="/services/after-renovation-cleaning" className="hover:text-[#FFA500]">After Renovation Cleaning</Link></li>
              <li><Link href="/services/commercial-cleaning" className="hover:text-[#FFA500]">Commercial Cleaning</Link></li>
              <li><Link href="/services/general-house-cleaning" className="hover:text-[#FFA500]">General House Cleaning</Link></li>
              <li><Link href="/services/ndis-cleaning" className="hover:text-[#FFA500]">NDIS Cleaning</Link></li>
              <li><Link href="/services/office-cleaning" className="hover:text-[#FFA500]">Office Cleaning</Link></li>
              <li><Link href="/services/oven-cleaning" className="hover:text-[#FFA500]">Oven Cleaning</Link></li>
              <li><Link href="/services/tile-and-floor-cleaning" className="hover:text-[#FFA500]">Tile and Floor Cleaning</Link></li>
              <li><Link href="/services/upholstery-cleaning" className="hover:text-[#FFA500]">Upholstery Cleaning</Link></li>
              <li><Link href="/services/window-cleaning" className="hover:text-[#FFA500]">Window Cleaning</Link></li>
              <li><Link href="/services/end-of-lease" className="hover:text-[#FFA500]">End of Lease Cleaning</Link></li>
            </ul>
          </div>

          {/* Column 4 - Operating Hours */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-6">Operating Hours</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li>Mon - Fri: 8am – 8pm</li>
              <li>Saturday: 9am - 7pm</li>
              <li>Sunday: 9am - 8pm</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} Cleaning Professional Copyrights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 