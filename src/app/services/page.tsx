'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { API_URL } from '@/config/api'

// Define the Service type
interface Service {
  _id: string  // MongoDB adds this field
  id: string
  title: string
  slug: string
  description: string
  price: string
  image: string
  isPopular?: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services`)
        const data = await response.json()
        
        if (data.success) {
          setServices(data.data)
        } else {
          toast.error('Failed to fetch services')
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        toast.error('Error loading services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <MainLayout>
      <div className="mt-32">
        {/* Hero Section */}
        <div className="relative py-20">
          {/* Background image and gradient overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/services-hero.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D8F]/90 via-[#1E3D8F]/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-white/60"></div>
                <span className="text-sm uppercase tracking-wider text-white/80">OUR SERVICES</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professionals cleaning<br />
                services for your homes<br />
                and offices
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                We are a professionals cleaning company and providing leading commercial and residential cleaning solutions in the Australia. When it comes to maintaining the cleanliness of your property, you deserve a service that stands out for its quality, reliability, and professionalism.
              </p>
              <Link 
                href="/get-quote"
                className="inline-flex items-center gap-2 bg-[#FFA500] text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition-all text-lg font-medium"
              >
                REQUEST A QUOTE
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gray-300"></div>
              <span className="text-sm uppercase tracking-wider text-gray-600">OUR SERVICES</span>
              <div className="w-12 h-[1px] bg-gray-300"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D8F]">
              We are providing all kind<br />
              of cleaning services
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              // Loading state
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading services...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service._id || service.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                    {service.isPopular && (
                      <div key={`popular-${service._id}`} className="bg-green-500 text-white text-center py-1 px-4 absolute top-4 left-4 rounded-full text-sm">
                        Popular
                      </div>
                    )}
                    <div className="relative h-64">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-[#1E3D8F]">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-700 font-medium">
                          {service.price}
                        </span>
                        <Link 
                          href={`/services/${service.id}`}
                          className="text-[#1E3D8F] hover:text-[#FFA500] transition-colors group flex items-center gap-2"
                        >
                          Learn More
                          <ArrowRight 
                            size={20} 
                            className="transform group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                      <Link
                        href="/book-now"
                        className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  )
} 