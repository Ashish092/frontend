'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Check } from 'lucide-react'
import Link from 'next/link'

const hourlyRates = [
  {
    title: 'Weekly Service',
    price: '58.50',
    discount: '10% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Regular scheduled cleaning'
    ],
    link: '/book?service=weekly',
    isPopular: false
  },
  {
    title: 'Fortnightly Service',
    price: '61.75',
    discount: '5% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Flexible scheduling'
    ],
    link: '/book?service=fortnightly',
    isPopular: true
  },
  {
    title: '3-Weekly Service',
    price: '63.05',
    discount: '3% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Consistent service quality'
    ],
    link: '/book?service=3weekly',
    isPopular: false
  },
  {
    title: 'Monthly / One-Time',
    price: '65.00',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'No commitment required'
    ],
    link: '/book?service=monthly',
    isPopular: false
  }
]

const flatRates = [
  {
    title: 'Standard Cleaning',
    description: 'Perfect for homes that need regular maintenance',
    startingPrice: '159',
    features: [
      'Your entire home will be cleaned',
      'Detailed cleaning checklist',
      'Extras available',
      'Cleaning products included',
      'Discounts for regular services'
    ],
    link: '/book?service=standard',
    buttonText: 'Review Service Details'
  },
  {
    title: 'Deep Cleaning',
    description: 'Perfect for homes that haven\'t been cleaned in 4-6 weeks or more',
    startingPrice: '239',
    features: [
      'Your entire home will be deep cleaned',
      'Detailed cleaning checklist',
      'Extras available',
      'Cleaning products included',
      'Discounts for regular services'
    ],
    link: '/book?service=deep',
    buttonText: 'Explore What\'s Covered',
    isPopular: true
  },
  {
    title: 'End of Lease Cleaning',
    description: 'Secure your bond and leave your property in pristine condition',
    startingPrice: '349',
    features: [
      'Fully Compliant with Real Estate Standards',
      '100% Cleaning Guarantee',
      'Extras available',
      'Cleaning products included',
      '7 days a week'
    ],
    link: '/book?service=endoflease',
    buttonText: 'View Service Inclusions'
  }
]

const detailedPricing = [
  {
    title: 'Carpet Cleaning',
    rates: [
      '1 Bedroom: $35 - $55',
      '2 Bedrooms: $60 - $75',
      '3 Bedrooms: $90 - $100',
      '4 Bedrooms: $120 + more'
    ],
    description: 'These prices cover deep steam cleaning and stain removal, ensuring your carpets are left fresh and hygienic.'
  },
  {
    title: 'General House Cleaning',
    rates: [
      'Hourly Rate: $35 - $50 per hour',
      '1 Bedroom: $80 - $110',
      '2 Bedrooms: $90 - $120',
      '3 Bedrooms: $110 - $140',
      '4 Bedrooms: $140 - $180'
    ],
    description: 'These rates include dusting, vacuuming, mopping, and general tidying of all rooms.'
  },
  {
    title: 'Upholstery Cleaning',
    rates: [
      'Sofa Cleaning: $60 - $100 per seat',
      'Armchair Cleaning: $50 - $80 per chair',
      'Mattress Cleaning: $80 - $120 per mattress'
    ],
    description: 'These prices include deep cleaning, stain removal, and deodorizing of upholstered furniture'
  },
  {
    title: 'Office Cleaning',
    rates: [
      'Hourly Rate: $35 - $50 per hour',
      'Small Office (up to 500 sq ft): $150 - $250 per visit',
      'Medium Office (500-2000 sq ft): $250 - $400 per visit',
      'Large Office (2000+ sq ft): $400 - $600 per visit'
    ],
    description: 'This includes desk cleaning, floor care, restroom sanitation, and more.'
  },
  {
    title: 'End of Lease Cleaning',
    rates: [
      '1 Bedroom/Studio Apartment: $220 - $260',
      '2 Bedroom Apartment/House: $260 - $300',
      '3 Bedroom Apartment/House: $300 - $350',
      '4 Bedroom House: $350 - $400'
    ],
    description: 'End of lease cleaning includes comprehensive cleaning of all rooms, kitchen deep cleaning, bathroom sanitization, and ensuring the property meets the landlord\'s standards for bond return.'
  },
  {
    title: 'Oven Cleaning',
    rates: [
      'Single Oven: $80 - $120',
      'Double Oven: $120 - $160',
      'Range/Oven with Stovetop: $150 - $200'
    ],
    description: 'Oven cleaning involves thorough cleaning of the interior and exterior, including racks and trays, to remove grease and burnt-on food residues'
  },
  {
    title: 'Window Cleaning',
    rates: [
      'Interior and Exterior (per window): $5 - $10',
      'Small Home (up to 10 windows): $80 - $100',
      'Medium Home (10-20 windows): $100 - $150',
      'Large Home (20+ windows): $150 - $200'
    ],
    description: 'This service ensures windows are streak-free and clear, enhancing the overall look of your home'
  },
  {
    title: 'After Renovation Cleaning',
    rates: [
      'Hourly Rate: $45 - $60 per hour',
      'Small Home (up to 1000 sq ft): $300 - $400',
      'Medium Home (1000-2000 sq ft): $400 - $600',
      'Large Home (2000+ sq ft): $600 - $800'
    ],
    description: 'This includes removal of construction dust, debris, and thorough cleaning of all surfaces to prepare the space for occupancy'
  },
  {
    title: 'Commercial Cleaning',
    rates: [
      'Hourly Rate: $40 - $55 per hour',
      'Small Office (up to 500 sq ft): $200 - $300 per visit',
      'Medium Office (500-2000 sq ft): $300 - $500 per visit',
      'Large Office (2000+ sq ft): $500 - $800 per visit'
    ],
    description: 'These services include detailed cleaning of workspaces, restrooms, common areas, and more.'
  },
  {
    title: 'Tile and Floor Cleaning',
    rates: [
      'Hourly Rate: $40 - $55 per hour',
      'Small Areas (up to 500 sq ft): $150 - $200',
      'Medium Areas (500-1500 sq ft): $200 - $300',
      'Large Areas (1500+ sq ft): $300 - $450'
    ],
    description: 'This service includes scrubbing, polishing, and sealing of tile and floor surfaces to restore their appearance and prolong their lifespan'
  },
  {
    title: 'NDIS Cleaning',
    rates: [
      'Hourly Rate: $35 - $50 per hour (with NDIS funding typically covering up to $50.20 per hour)'
    ],
    description: 'Service Plans: Customizable based on individual needs, including regular cleaning, deep cleaning, and specialized cleaning services such as hypoallergenic cleaning. These services are tailored to the needs of individuals with disabilities, ensuring a clean and safe living environment that meets NDIS standards'
  }
]

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="mt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1E3D8F] to-transparent">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              House Cleaning Prices
            </h1>
            <p className="text-xl text-white/90">
              Simple and Transparent Prices
            </p>
          </div>
        </div>

        {/* Hourly Rates Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Hourly Rates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hourlyRates.map((rate) => (
                <div 
                  key={rate.title}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                    rate.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {rate.isPopular && (
                    <div className="bg-green-500 text-white text-center py-2">
                      Popular Choice
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-4">{rate.title}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">${rate.price}</span>
                        <span className="text-gray-600 ml-1">/hour</span>
                      </div>
                      {rate.discount && (
                        <div className="text-green-500 font-semibold mb-4">
                          {rate.discount}
                        </div>
                      )}
                      <ul className="space-y-3 mb-6">
                        {rate.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={rate.link}
                      className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all mt-6"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flat Rates Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Flat-Rates for a complete home cleaning
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Flat-rate home cleaning services are designed to cover all general cleaning needs without the constraints of hourly billing, ensuring a comprehensive clean that meets our high standards every time.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {flatRates.map((rate) => (
                <div 
                  key={rate.title}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                    rate.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {rate.isPopular && (
                    <div className="bg-green-500 text-white text-center py-2">
                      Popular Choice
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{rate.title}</h3>
                      <p className="text-gray-600 mb-4">{rate.description}</p>
                      <div className="mb-6">
                        <div className="text-sm text-gray-500">FROM</div>
                        <div className="text-3xl font-bold">${rate.startingPrice}</div>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {rate.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={rate.link}
                      className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all mt-6"
                    >
                      {rate.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Detailed Cleaning Pricing
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Comprehensive pricing for all our specialized cleaning services
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedPricing.map((service) => (
                <div 
                  key={service.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <ul className="space-y-3 mb-6">
                        {service.rates.map((rate) => (
                          <li key={rate} className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{rate}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-600 text-sm border-t pt-4">
                        {service.description}
                      </p>
                    </div>
                    <Link
                      href={`/book?service=${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all mt-6"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
} 