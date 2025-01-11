'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { use } from 'react'

// Service data structure
const serviceDetails = {
  'move-in-move-out-cleaning': {
    title: 'Move In/Move Out Cleaning',
    description: 'Professional end of lease cleaning service to ensure you get your bond back.',
    image: '/images/Movein.png',
    price: 'From $359',
    features: [
      'Comprehensive cleaning of all rooms',
      'Kitchen deep cleaning including oven and cabinets',
      'Bathroom sanitization and descaling',
      'Window cleaning (interior)',
      'Carpet steam cleaning',
      'Wall spot cleaning',
      'Light fixtures and switches cleaning',
      'Skirting boards and door frames'
    ],
    includes: [
      'All cleaning supplies and equipment',
      'Trained and insured cleaners',
      'Bond back guarantee',
      'Same-day service available',
      'Free re-clean if required'
    ],
    faqs: [
      {
        question: 'How long does end of lease cleaning take?',
        answer: 'The duration depends on the property size. Generally, it takes 4-8 hours for a standard property.'
      },
      {
        question: 'Do you guarantee bond back?',
        answer: 'Yes, we offer a bond back guarantee. If there are any issues, we\'ll return to clean again at no extra cost.'
      },
      // Add more FAQs
    ]
  },
  'carpet-cleaning': {
    title: 'Carpet Cleaning',
    description: 'Professional carpet cleaning service using advanced steam cleaning technology to remove deep-seated dirt, stains, and allergens.',
    image: '/images/carpet-cleaning.png',
    price: 'From $35 - $55 per room',
    features: [
      'Deep steam cleaning',
      'Stain removal treatment',
      'Deodorizing treatment',
      'Pet stain and odor removal',
      'Quick drying process',
      'Eco-friendly cleaning solutions',
      'Pre-treatment of heavy stains',
      'Protection treatment available'
    ],
    includes: [
      'Professional grade equipment',
      'Eco-friendly cleaning solutions',
      'Experienced technicians',
      'Spot treatment included',
      'Free deodorizing'
    ],
    faqs: [
      {
        question: 'How long does carpet cleaning take to dry?',
        answer: 'Typically 4-6 hours, depending on carpet thickness and humidity levels.'
      },
      {
        question: 'Do you move furniture?',
        answer: 'Yes, we move light furniture. Heavy items need to be moved before service.'
      }
    ]
  },
  'after-renovation-cleaning': {
    title: 'After Renovation Cleaning',
    description: 'Comprehensive post-renovation cleaning service to remove all construction dust, debris, and make your space ready for use.',
    image: '/images/after-renovation-cleaning.jpg',
    price: 'From $45 per hour',
    features: [
      'Dust and debris removal',
      'Paint spot cleaning',
      'Window and frame cleaning',
      'Floor deep cleaning',
      'Air vent cleaning',
      'Light fixture cleaning',
      'Cabinet interior cleaning',
      'Hardware cleaning and polishing'
    ],
    includes: [
      'Specialized cleaning equipment',
      'Heavy-duty vacuum cleaners',
      'Professional cleaning agents',
      'Experienced cleaning team',
      'Complete site cleanup'
    ],
    faqs: [
      {
        question: 'How soon after renovation can you clean?',
        answer: 'We can start cleaning as soon as all construction work is completed and materials are removed.'
      }
    ]
  },
  'commercial-cleaning': {
    title: 'Commercial Cleaning',
    description: 'Professional cleaning services for offices, retail spaces, and commercial properties.',
    image: '/images/commercial-cleaning.jpg',
    price: 'Custom Quote',
    features: [
      'Office space cleaning',
      'Restroom sanitation',
      'Floor maintenance',
      'Window cleaning',
      'Kitchen/break room cleaning',
      'Trash removal',
      'Carpet cleaning',
      'Surface disinfection'
    ],
    includes: [
      'Customized cleaning schedule',
      'Professional cleaning staff',
      'All cleaning supplies',
      'Quality assurance checks',
      'Emergency cleaning service'
    ],
    faqs: [
      {
        question: 'Do you clean after hours?',
        answer: 'Yes, we offer flexible scheduling including after-hours and weekend cleaning.'
      }
    ]
  },
  'general-house-cleaning': {
    title: 'General House Cleaning',
    description: 'Regular home cleaning service to maintain a clean and healthy living environment.',
    image: '/images/general-cleaning.jpg',
    price: 'From $35 per hour',
    features: [
      'Dusting all surfaces',
      'Vacuum and mopping',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bedroom tidying',
      'Living areas cleaning',
      'Window sill cleaning',
      'Cobweb removal'
    ],
    includes: [
      'Regular scheduled service',
      'Trained cleaning staff',
      'Cleaning supplies included',
      'Customizable cleaning checklist',
      'Satisfaction guarantee'
    ],
    faqs: [
      {
        question: 'How often should I schedule cleaning?',
        answer: 'We recommend weekly or fortnightly service for optimal results, but we can customize to your needs.'
      }
    ]
  },
  'ndis-cleaning': {
    title: 'NDIS Cleaning',
    description: 'Specialized cleaning services for NDIS participants, ensuring a safe and hygienic living environment.',
    image: '/images/ndis-cleaning.jpg',
    price: '$35 - $50 per hour',
    features: [
      'Customized cleaning plans',
      'Regular maintenance cleaning',
      'Deep cleaning services',
      'Bathroom and kitchen sanitization',
      'Bedroom and living area cleaning',
      'Laundry assistance',
      'Floor care',
      'Special needs accommodation'
    ],
    includes: [
      'NDIS registered provider',
      'Trained support staff',
      'Flexible scheduling',
      'Regular service reports',
      'Client-focused approach'
    ],
    faqs: [
      {
        question: 'Is this service NDIS funded?',
        answer: 'Yes, our service is NDIS approved and can be covered under your NDIS plan.'
      }
    ]
  },
  'end-of-lease': {
    title: 'End of Lease Cleaning',
    description: 'Professional end of lease cleaning service to ensure you get your bond back.',
    image: '/images/end-of-lease-cleaning.jpg',
    price: 'From $359',
    features: [
      'Comprehensive cleaning of all rooms',
      'Kitchen deep cleaning including oven and cabinets',
      'Bathroom sanitization and descaling',
      'Window cleaning (interior)',
      'Carpet steam cleaning',
      'Wall spot cleaning',
      'Light fixtures and switches cleaning',
      'Skirting boards and door frames'
    ],
    includes: [
      'All cleaning supplies and equipment',
      'Trained and insured cleaners',
      'Bond back guarantee',
      'Same-day service available',
      'Free re-clean if required'
    ],
    faqs: [
      {
        question: 'How long does end of lease cleaning take?',
        answer: 'The duration depends on the property size. Generally, it takes 4-8 hours for a standard property.'
      },
      {
        question: 'Do you guarantee bond back?',
        answer: 'Yes, we offer a bond back guarantee. If there are any issues, we\'ll return to clean again at no extra cost.'
      },
      // Add more FAQs
    ]
  },
  'deep-cleaning': {
    title: 'Deep Cleaning',
    description: 'Regular home cleaning service to maintain a clean and healthy living environment.',
    image: '/images/deep-cleaning.jpg',
    price: 'From $35 per hour',
    features: [
      'Dusting all surfaces',
      'Vacuum and mopping',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bedroom tidying',
      'Living areas cleaning',
      'Window sill cleaning',
      'Cobweb removal'
    ],
    includes: [
      'Regular scheduled service',
      'Trained cleaning staff',
      'Cleaning supplies included',
      'Customizable cleaning checklist',
      'Satisfaction guarantee'
    ],
    faqs: [
      {
        question: 'How often should I schedule cleaning?',
        answer: 'We recommend weekly or fortnightly service for optimal results, but we can customize to your needs.'
      }
    ]
  },
  'regular-cleaning': {
    title: 'Regular Cleaning',
    description: 'Regular home cleaning service to maintain a clean and healthy living environment.',
    image: '/images/regular-cleaning.png',
    price: 'From $35 per hour',
    features: [
      'Dusting all surfaces',
      'Vacuum and mopping',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bedroom tidying',
      'Living areas cleaning',
      'Window sill cleaning',
      'Cobweb removal'
    ],
    includes: [
      'Regular scheduled service',
      'Trained cleaning staff',
      'Cleaning supplies included',
      'Customizable cleaning checklist',
      'Satisfaction guarantee'
    ],
    faqs: [
      {
        question: 'How often should I schedule cleaning?',
        answer: 'We recommend weekly or fortnightly service for optimal results, but we can customize to your needs.'
      }
    ]
  },
  
  'oven-cleaning': {
    title: 'Oven Cleaning',
    description: 'Specialized oven cleaning service using eco-friendly products to remove grease, grime, and burnt-on food residue.',
    image: '/images/oven-cleaning.jpg',
    price: 'From $80',
    features: [
      'Complete interior cleaning',
      'Door and glass cleaning',
      'Rack and tray cleaning',
      'Stovetop cleaning',
      'Range hood cleaning',
      'Grease filter cleaning',
      'Control panel cleaning',
      'Eco-friendly products used'
    ],
    includes: [
      'Non-toxic cleaning solutions',
      'Professional equipment',
      'Same-day service',
      'Satisfaction guarantee',
      'Free deodorizing'
    ],
    faqs: [
      {
        question: 'How long does oven cleaning take?',
        answer: 'A standard oven cleaning typically takes 1-2 hours, depending on the condition.'
      },
      {
        question: 'Are your products safe for cooking afterwards?',
        answer: 'Yes, our eco-friendly products are food-safe and leave no harmful residues.'
      },
      {
        question: 'Do you clean all types of ovens?',
        answer: 'Yes, we clean all types including standard, self-cleaning, range ovens, and commercial ovens.'
      }
    ]
  },
  'general-cleaning': {
    title: 'General Cleaning',
    description: 'Regular home cleaning service to maintain a clean and healthy living environment.',
    image: '/images/general-cleaning.jpg',
    price: 'From $35 per hour',
    features: [
      'Dusting all surfaces',
      'Vacuum and mopping',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bedroom tidying',
      'Living areas cleaning',
      'Window sill cleaning',
      'Cobweb removal'
    ],
    includes: [
      'Regular scheduled service',
      'Trained cleaning staff',
      'Cleaning supplies included',
      'Customizable cleaning checklist',
      'Satisfaction guarantee'
    ],
    faqs: [
      {
        question: 'How often should I schedule cleaning?',
        answer: 'We recommend weekly or fortnightly service for optimal results, but we can customize to your needs.'
      }
    ]
  },
  
  'tile-and-floor-cleaning': {
    title: 'Tile and Floor Cleaning',
    description: 'Professional floor cleaning service for all types of flooring, including tiles, hardwood, vinyl, and natural stone.',
    image: '/images/floor-cleaning.png',
    price: '$40 - $55 per hour',
    features: [
      'Deep tile cleaning',
      'Grout cleaning and sealing',
      'Natural stone restoration',
      'Hardwood floor cleaning',
      'Vinyl floor maintenance',
      'Marble floor polishing',
      'Concrete floor cleaning',
      'Anti-slip treatment available'
    ],
    includes: [
      'Professional grade equipment',
      'Specialized cleaning solutions',
      'Sealing services',
      'Stain removal',
      'Free floor assessment'
    ],
    faqs: [
      {
        question: 'How often should I have my floors professionally cleaned?',
        answer: 'We recommend professional cleaning every 12-18 months for residential and 6-12 months for commercial floors.'
      },
      {
        question: 'Do you offer grout sealing?',
        answer: 'Yes, we provide grout sealing services to protect against stains and moisture.'
      },
      {
        question: 'Can you remove tough stains?',
        answer: 'Yes, we have specialized products and techniques for removing most types of stains from all floor types.'
      }
    ]
  },
  'upholstery-cleaning': {
    title: 'Upholstery Cleaning',
    description: 'Professional upholstery cleaning service to refresh and extend the life of your furniture.',
    image: '/images/upholstery-cleaning.png',
    price: 'From $60 per seat',
    features: [
      'Deep fabric cleaning',
      'Stain removal treatment',
      'Odor elimination',
      'Fabric protection coating',
      'Leather furniture cleaning',
      'Pet hair removal',
      'Dust mite treatment',
      'Fabric refreshing'
    ],
    includes: [
      'Pre-inspection service',
      'Spot testing',
      'Professional equipment',
      'Eco-friendly products',
      'Deodorizing treatment'
    ],
    faqs: [
      {
        question: 'How long does it take to dry?',
        answer: 'Most upholstery dries within 4-6 hours, depending on fabric type and humidity.'
      },
      {
        question: 'Can you clean all fabric types?',
        answer: 'Yes, we clean all types of fabrics including delicate materials, using appropriate cleaning methods for each.'
      },
      {
        question: 'Do you treat leather furniture?',
        answer: 'Yes, we use specialized products and techniques for leather furniture cleaning and conditioning.'
      }
    ]
  },
  'window-cleaning': {
    title: 'Window Cleaning',
    description: 'Professional window cleaning service for crystal clear views and enhanced curb appeal.',
    image: '/images/windows-cleaning.png',
    price: 'From $5 - $10 per window',
    features: [
      'Interior window cleaning',
      'Exterior window cleaning',
      'Track and sill cleaning',
      'Screen cleaning',
      'Frame wiping',
      'Streak-free finish',
      'High-rise capability',
      'Hard water stain removal'
    ],
    includes: [
      'Professional equipment',
      'Eco-friendly solutions',
      'Safety equipment',
      'Experienced technicians',
      'Insurance coverage'
    ],
    faqs: [
      {
        question: 'How often should windows be professionally cleaned?',
        answer: 'We recommend professional cleaning every 3-6 months for optimal results.'
      },
      {
        question: 'Can you clean high windows?',
        answer: 'Yes, we have specialized equipment and trained staff for cleaning windows at any height.'
      },
      {
        question: 'Do you clean screens and tracks?',
        answer: 'Yes, our service includes cleaning of window tracks, sills, and screens for a complete clean.'
      }
    ]
  }
}

export default function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = use(params)
  const service = serviceDetails[resolvedParams.service as keyof typeof serviceDetails]

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 mt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Service not found</h1>
            <Link 
              href="/services" 
              className="text-[#1E3D8F] hover:text-[#FFA500] mt-4 inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mt-32">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-white/90">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-8">What&apos;s Included</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Service Includes */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-8">Service Benefits</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center mb-4 last:mb-0">
                        <Check className="text-green-500 mr-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {service.faqs.map((faq) => (
                      <div key={faq.question} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
                  <h3 className="text-2xl font-bold mb-4">Book This Service</h3>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-3xl font-bold text-[#1E3D8F]">{service.price}</div>
                  </div>
                  <Link
                    href="/book-now"
                    className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all mb-4"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/get-quote"
                    className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 