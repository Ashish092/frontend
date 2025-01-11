'use client'

import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Add services submenu data
const serviceLinks = [
  { title: 'All Services', href: '/services' },
  { title: 'Carpet Cleaning', href: '/services/carpet-cleaning' },
  { title: 'After Renovation Cleaning', href: '/services/after-renovation-cleaning' },
  { title: 'Commercial Cleaning', href: '/services/commercial-cleaning' },
  { title: 'End of Lease Cleaning', href: '/services/end-of-lease' },
  { title: 'General House Cleaning', href: '/services/general-cleaning' },
  { title: 'NDIS Cleaning', href: '/services/ndis-cleaning' },
  { title: 'Office Cleaning', href: '/services/office-cleaning' },
  { title: 'Oven Cleaning', href: '/services/oven-cleaning' },
  { title: 'Tile and Floor Cleaning', href: '/services/tile-and-floor-cleaning' },
  { title: 'Upholstery Cleaning', href: '/services/upholstery-cleaning' },
  { title: 'Move In/Move Out Cleaning', href: '/services/move-in-move-out-cleaning' },
  { title: 'Window Cleaning', href: '/services/window-cleaning' }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Top Bar - Hide on mobile */}
      <div className="bg-[#f7f7f7] py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-gray-600" />
              <a href="tel:0450124086" className="text-gray-600 hover:text-[#1E3D8F]">0450124086</a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-gray-600" />
              <a href="mailto:account@cleaningprofessionals.com.au" className="text-gray-600 hover:text-[#1E3D8F]">
                account@cleaningprofessionals.com.au
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image 
                src="/logos/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
              />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image 
                src="/logos/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
                className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
              />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image 
                src="/logos/linkedin.png"
                alt="LinkedIn"
                width={20}
                height={20}
                className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
              />
            </a>
            <a 
              href="https://wa.me/0450124086" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center"
            >
              <Image 
                src="/logos/whatsapp.png"
                alt="WhatsApp"
                width={20}
                height={20}
                className="w-full h-full object-contain hover:opacity-80 transition-opacity opacity-60"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className={`bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
        {/* First Row - Logo and Menu Button */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Cleaning Professionals"
                width={180}
                height={60}
                className="object-contain w-[140px] md:w-[180px]"
              />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                pathname === '/' ? 'text-[#1E3D8F] font-semibold' : ''
              }`}>
                HOME
              </Link>
              <Link href="/about" className={`text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                pathname === '/about' ? 'text-[#1E3D8F] font-semibold' : ''
              }`}>
                ABOUT
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-1 text-gray-700 hover:text-[#1E3D8F] transition-colors ${
                    pathname.startsWith('/services') ? 'text-[#1E3D8F] font-semibold' : ''
                  }`}
                >
                  SERVICES
                  <ChevronDown 
                    size={16} 
                    className="transform transition-transform group-hover:rotate-180" 
                  />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {serviceLinks.map((link, index) => (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1E3D8F] ${
                          pathname === link.href ? 'text-[#1E3D8F] font-semibold bg-gray-50' : ''
                        }`}
                      >
                        {link.title}
                      </Link>
                      {index === 0 && (
                        <div className="my-2 border-b border-gray-100"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                href="/pricing" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/pricing') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                PRICING
              </Link>
              <Link 
                href="/blog" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/blog') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                BLOG
              </Link>
              <Link 
                href="/faqs" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/faqs') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                FAQS
              </Link>
              <Link 
                href="/contact" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/contact') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                CONTACT
              </Link>
              <Link 
                href="/get-quote" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/get-quote') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                GET QUOTE
              </Link>
              <Link 
                href="/career" 
                className={`text-gray-700 hover:text-[#1E3D8F] transition-colors relative ${
                  isActive('/career') ? 'text-[#1E3D8F] font-semibold after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#1E3D8F]' : ''
                }`}
              >
                CAREER
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Call Button - Show only on desktop */}
              <Link 
                href="tel:0450124086"
                className="hidden md:flex bg-[#FFA500] text-white px-6 py-2 rounded-md hover:bg-opacity-90 whitespace-nowrap transition-all"
              >
                Call Us: 0450124086
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Second Row - Mobile Action Buttons */}
        <div className="lg:hidden border-t border-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-0">
              <Link 
                href="tel:0450124086"
                className="w-full bg-[#FFA500] text-white px-4 py-3 text-center text-sm hover:bg-opacity-90 transition-all"
              >
                Call Us Now
              </Link>
              <Link 
                href="/quick-book"
                className="w-full bg-white text-[#1E3D8F] px-4 py-3 text-center text-sm hover:bg-[#1E3D8F] hover:text-white transition-all border-l border-gray-100"
              >
                Quick Book
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-50 transition-transform duration-300 lg:hidden overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '116px' }}
        >
          {/* Mobile Navigation Links */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-[#1E3D8F] py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-[#1E3D8F] py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              
              {/* Services Dropdown in Mobile */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#1E3D8F] py-2"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span>SERVICES</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 text-gray-600 hover:text-[#1E3D8F]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Rest of mobile menu links */}
              {['PRICING', 'BLOG', 'FAQS', 'CONTACT', 'GET QUOTE', 'CAREER'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-[#1E3D8F] py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Contact Info - Moved to bottom */}
          <div className="border-t border-gray-100 mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <a 
                  href="tel:0450124086" 
                  className="flex items-center text-gray-600 hover:text-[#1E3D8F]"
                >
                  <Phone size={16} className="mr-2" />
                  0450124086
                </a>
                <a 
                  href="mailto:account@cleaningprofessionals.com.au" 
                  className="flex items-center text-gray-600 hover:text-[#1E3D8F] text-sm"
                >
                  <Mail size={16} className="mr-2" />
                  account@cleaningprofessionals.com.au
                </a>
                
                {/* Social Media Icons */}
                <div className="flex items-center space-x-4 pt-4">
                  <a href="https://facebook.com" className="text-gray-600 hover:text-[#1E3D8F]">
                    <Image src="/logos/facebook.png" alt="Facebook" width={20} height={20} />
                  </a>
                  <a href="https://instagram.com" className="text-gray-600 hover:text-[#1E3D8F]">
                    <Image src="/logos/instagram.png" alt="Instagram" width={20} height={20} />
                  </a>
                  <a href="https://linkedin.com" className="text-gray-600 hover:text-[#1E3D8F]">
                    <Image src="/logos/linkedin.png" alt="LinkedIn" width={20} height={20} />
                  </a>
                  <a href="https://wa.me/0450124086" className="text-gray-600 hover:text-[#1E3D8F]">
                    <Image src="/logos/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 