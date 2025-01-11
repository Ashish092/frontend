'use client'

import { Check, Info } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RoomOption {
  id: string
  type: string
  priceMultiplier: number
  durationMultiplier: number
}

interface ServiceOption {
  id: string
  title: string
  description: string
  basePrice: number
  baseDuration: number
  features: string[]
  popular?: boolean
}

interface AddOn {
  id: string
  title: string
  description: string
  price: number
  duration: number
}

const roomOptions: RoomOption[] = [
  { id: 'studio', type: 'Studio', priceMultiplier: 0.8, durationMultiplier: 0.8 },
  { id: '1bed', type: '1 Bedroom', priceMultiplier: 1, durationMultiplier: 1 },
  { id: '2bed', type: '2 Bedrooms', priceMultiplier: 1.2, durationMultiplier: 1.2 },
  { id: '3bed', type: '3 Bedrooms', priceMultiplier: 1.4, durationMultiplier: 1.4 },
  { id: '4bed', type: '4 Bedrooms', priceMultiplier: 1.6, durationMultiplier: 1.6 },
  { id: '5plus', type: '5+ Bedrooms', priceMultiplier: 0, durationMultiplier: 0 }
]

const serviceOptions: ServiceOption[] = [
  {
    id: 'regular',
    title: 'Regular Clean',
    description: 'Perfect for maintaining a clean and tidy home on a regular basis',
    basePrice: 120,
    baseDuration: 3,
    features: [
      'All rooms vacuumed and mopped',
      'Bathroom and kitchen cleaning',
      'Dusting of all surfaces',
      'Making beds',
      'Empty trash bins',
      'Wipe down surfaces',
      'Clean mirrors and glass surfaces',
      'Sanitize bathroom fixtures',
      'Kitchen counters and stovetop cleaning',
      'Sweep and mop all floors'
    ]
  },
  {
    id: 'deep',
    title: 'Deep Clean',
    description: 'Thorough cleaning of all areas including inside cabinets and appliances',
    basePrice: 180,
    baseDuration: 4,
    popular: true,
    features: [
      'Everything in Regular Clean',
      'Inside cabinet cleaning',
      'Inside appliance cleaning',
      'Window cleaning',
      'Baseboards and door frames',
      'Light fixtures and ceiling fans',
      'Wall spot cleaning',
      'Remove cobwebs',
      'Detailed bathroom cleaning',
      'Deep kitchen cleaning'
    ]
  },
  {
    id: 'move',
    title: 'Move In/Out Clean',
    description: 'Detailed cleaning for moving in or out of a property',
    basePrice: 250,
    baseDuration: 5,
    features: [
      'Everything in Deep Clean',
      'Inside all cupboards and drawers',
      'Inside all appliances',
      'Window tracks and frames',
      'Light switches and door handles',
      'Skirting boards and architraves',
      'Remove all dust and debris',
      'Garage sweep and clean',
      'Patio and balcony cleaning',
      'Full property sanitization'
    ]
  },
  {
    id: 'carpet',
    title: 'Carpet Cleaning',
    description: 'Professional deep carpet cleaning and stain removal',
    basePrice: 200,
    baseDuration: 3,
    features: [
      'Deep steam cleaning',
      'Stain treatment and removal',
      'Deodorizing treatment',
      'Pet stain treatment',
      'High traffic area focus',
      'Edge cleaning',
      'Spot cleaning',
      'Sanitizing treatment',
      'Quick dry process',
      'Eco-friendly products available'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Clean',
    description: 'Specialized cleaning for offices and commercial spaces',
    basePrice: 300,
    baseDuration: 4,
    features: [
      'Reception and common areas',
      'Office workstations',
      'Meeting rooms',
      'Kitchen and break rooms',
      'Restroom sanitization',
      'Window cleaning',
      'Carpet vacuuming',
      'Hard floor cleaning',
      'Trash removal',
      'Available after hours'
    ]
  },
  {
    id: 'ndis',
    title: 'NDIS Clean',
    description: 'Specialized cleaning services for NDIS participants',
    basePrice: 180,
    baseDuration: 3,
    features: [
      'NDIS registered provider',
      'Trained support workers',
      'Flexible scheduling',
      'Regular or one-off cleaning',
      'Customized cleaning plans',
      'Bathroom assistance',
      'Kitchen organization',
      'Laundry assistance',
      'Bed making',
      'Specialized equipment cleaning'
    ]
  },
  {
    id: 'oven',
    title: 'Oven Clean',
    description: 'Professional deep cleaning for ovens and cooktops',
    basePrice: 150,
    baseDuration: 2,
    features: [
      'Complete oven cleaning',
      'Cooktop cleaning',
      'Range hood cleaning',
      'Removal of burnt-on food',
      'Grease removal',
      'Rack and tray cleaning',
      'Door glass cleaning',
      'Eco-friendly products',
      'Deodorizing treatment',
      'Same day service available'
    ]
  }
]

const addOns: AddOn[] = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    description: 'Interior and exterior window cleaning',
    price: 50,
    duration: 1
  },
  {
    id: 'carpet',
    title: 'Carpet Steam Clean',
    description: 'Deep carpet cleaning with professional equipment',
    price: 80,
    duration: 1.5
  },
  {
    id: 'fridge',
    title: 'Fridge Deep Clean',
    description: 'Thorough cleaning inside and out',
    price: 30,
    duration: 0.5
  },
  {
    id: 'oven',
    title: 'Oven Deep Clean',
    description: 'Detailed cleaning of oven and stovetop',
    price: 40,
    duration: 1
  }
]

export default function CleaningService() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedRoomSize, setSelectedRoomSize] = useState<string>('1bed')
  const [showContactModal, setShowContactModal] = useState(false)
  const [showFeatures, setShowFeatures] = useState<string | null>(null)

  const handleRoomSizeSelect = (roomId: string) => {
    setSelectedRoomSize(roomId)
    if (roomId === '5plus') {
      setShowContactModal(true)
      setSelectedService('')
      setSelectedAddOns([])
    }
  }

  const calculateTotal = () => {
    const baseService = serviceOptions.find(s => s.id === selectedService)
    const roomSize = roomOptions.find(r => r.id === selectedRoomSize)
    
    if (!baseService || !roomSize) return { price: 0, duration: 0 }

    const basePrice = baseService.basePrice * roomSize.priceMultiplier
    const baseDuration = baseService.baseDuration * roomSize.durationMultiplier

    const addOnTotals = selectedAddOns.reduce((acc, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId)
      if (addOn) {
        return {
          price: acc.price + addOn.price,
          duration: acc.duration + addOn.duration
        }
      }
      return acc
    }, { price: 0, duration: 0 })

    return {
      price: Math.round(basePrice + addOnTotals.price),
      duration: Number((baseDuration + addOnTotals.duration).toFixed(1))
    }
  }

  const total = calculateTotal()

  const handleContinue = () => {
    if (!selectedService) return

    const service = serviceOptions.find(s => s.id === selectedService)
    if (!service) return

    // Store selected service in localStorage
    localStorage.setItem('selectedService', JSON.stringify({
      id: service.id,
      title: service.title,
      price: total.price,
      duration: total.duration
    }))

    // Trigger storage event for real-time updates
    window.dispatchEvent(new Event('storage'))

    router.push('/quick-book/details')
  }

  return (
    <div className="max-w-3xl">
      {/* Room Size Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Select Home Size</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {roomOptions.map((room) => (
            <button
              key={room.id}
              onClick={() => handleRoomSizeSelect(room.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedRoomSize === room.id 
                  ? 'bg-[#e6f0fa] text-[#1E3D8F] border-2 border-[#1E3D8F]'
                  : 'bg-white border border-gray-200 hover:border-[#90c2f7]'
                }`}
            >
              {room.type}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Modal for 5+ Bedrooms */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Special Booking Required</h3>
            <p className="text-gray-600 mb-6">
              For homes with 5 or more bedrooms, we offer customized cleaning solutions 
              with special rates. Please contact us directly to discuss your specific needs.
            </p>
            <div className="space-y-4">
              <a 
                href="tel:0450124086"
                className="flex items-center justify-center gap-2 w-full bg-[#1E3D8F] text-white py-3 
                  rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Call Us Now
              </a>
              <button
                onClick={() => {
                  setShowContactModal(false)
                  setSelectedRoomSize('4bed')
                }}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg 
                  font-medium hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Only show service options if not 5+ bedrooms */}
      {selectedRoomSize !== '5plus' && (
        <>
          {/* Service Selection */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {serviceOptions.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative p-6 border rounded-lg cursor-pointer transition-all
                  ${selectedService === service.id
                    ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                    : 'border-gray-200 hover:border-[#90c2f7]'
                  }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-4 bg-[#1E3D8F] text-white px-3 py-1 rounded-full text-sm">
                    Popular
                  </span>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  {selectedService === service.id && (
                    <Check className="w-5 h-5 text-[#1E3D8F]" />
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowFeatures(showFeatures === service.id ? null : service.id)
                  }}
                  className="text-sm text-[#1E3D8F] hover:text-[#0854ac] mb-4"
                >
                  {showFeatures === service.id ? 'Hide Features' : 'View Features'}
                </button>

                {showFeatures === service.id && (
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E3D8F] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">
                    From ${Math.round(service.basePrice * (roomOptions.find(r => r.id === selectedRoomSize)?.priceMultiplier ?? 1))}
                  </span>
                  <span className="text-gray-500">
                    ~{Math.round(service.baseDuration * (roomOptions.find(r => r.id === selectedRoomSize)?.durationMultiplier ?? 1))} hours
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          {selectedService && (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">Add Extra Services</h2>
                  <Info className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      onClick={() => {
                        setSelectedAddOns(prev => 
                          prev.includes(addOn.id)
                            ? prev.filter(id => id !== addOn.id)
                            : [...prev, addOn.id]
                        )
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all
                        ${selectedAddOns.includes(addOn.id)
                          ? 'border-[#1E3D8F] bg-[#e6f0fa]'
                          : 'border-gray-200 hover:border-[#90c2f7]'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{addOn.title}</h3>
                          <p className="text-sm text-gray-600">{addOn.description}</p>
                        </div>
                        {selectedAddOns.includes(addOn.id) && (
                          <Check className="w-5 h-5 text-[#1E3D8F]" />
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">+${addOn.price}</span>
                        <span className="text-gray-500">+{addOn.duration}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Continue Button */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">Total</h3>
                    <p className="text-sm text-gray-600">Including all selections</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold">${total.price}</div>
                    <div className="text-sm text-gray-600">~{total.duration} hours</div>
                  </div>
                </div>
                <button
                  className="w-full bg-[#1E3D8F] text-white py-3 rounded-lg font-medium
                    hover:bg-opacity-90 transition-colors"
                  onClick={handleContinue}
                >
                  Continue to Booking Details
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
} 