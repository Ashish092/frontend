'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import SubscriptionSection from '@/components/features/SubscriptionSection'
import QuickEnquiryForm from '@/components/features/QuickEnquiryForm'
import AnimatedCounter from '@/components/features/AnimatedCounter'
import { useState, useEffect } from 'react'

interface Testimonial {
  name: string;
  text: string;
}

// Trusted organizations logos
const trustedOrgs = [
  { name: 'Woodards', image: '/logos/woodards.jpeg' },
  { name: 'Ray White', image: '/logos/raywhite.jpeg' },
  { name: 'Raine & Horne', image: '/logos/raineandhorne.jpeg' },
  { name: 'Harcourts', image: '/logos/harcourts.jpeg' },
  { name: 'LJ Hooker', image: '/logos/ljhooker.jpeg' },
  { name: 'YPA', image: '/logos/ypa.jpeg' }
]

// Services data
const services = [
  {
    title: 'Move In/Move Out Cleaning',
    slug: 'move-in-move-out-cleaning',
    description: 'Moving out? Our end-of-lease cleaning service ensures you leave the property in pristine condition. We handle everything from deep cleaning carpets to scrubbing kitchens and bathrooms.',
    price: 'Starts from: $275',
    image: '/images/Movein.png',
    link: '/services/move-in-move-out-cleaning',
    isPopular: true
  },
  {
    title: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    description: 'Our carpet cleaning service uses deep-cleaning techniques to remove stains, dirt, and allergens, leaving your carpets looking fresh and new. Ideal for homes, offices, and commercial spaces.',
    price: 'Starts from : $35 - $55 ( each)',
    image: '/images/carpet-cleaning.png',
    link: '/services/carpet-cleaning'
  },
  {
    title: 'NDIS Cleaning',
    description: 'We offer specialized cleaning services under the NDIS (National Disability Insurance Scheme), ensuring your home remains clean, safe, and hygienic.',
    price: 'Hourly rate: $35 - $50 per hour',
    image: '/images/ndis-cleaning.jpg',
    link: '/services/ndis-cleaning'
  },
  {
    title: 'Window Cleaning',
    description: 'Our window cleaning service ensures streak-free windows, providing a clear view inside and out. Whether it\'s your home or office, we can handle both interior and exterior window cleaning.',
    price: 'From $299',
    image: '/images/windows-cleaning.png',
    link: '/services/window-cleaning'
  },
  {
    title: 'Oven Cleaning',
    description: 'Our oven cleaning service is perfect for households or businesses that want their ovens thoroughly cleaned. We remove grease, grime, and burnt-on food to restore your oven\'s cleanliness.',
    price: 'From $80',
    image: '/images/oven-cleaning.jpg',
    link: '/services/oven-cleaning'
  },
  {
    title: 'General Cleaning',
    description: 'Our comprehensive general cleaning service covers all aspects of home cleaning, from dusting and vacuuming to bathroom and kitchen cleaning, ensuring your space stays fresh and hygienic.',
    price: 'Hourly rate: $35 - $45',
    image: '/images/general-cleaning.jpg',
    link: '/services/general-cleaning'
  }
]

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Carpet Cleaning: 7 Powerful Benefits for a Healthier Home',
    slug: 'carpet-cleaning-benefits',
    excerpt: 'Discover professional cleaning techniques that will transform your home...',
    image: '/images/blog/carpet-cleaning.webp',
    date: 'Dec 13, 2024',
    author: 'Sarah Johnson',
    category: 'Uncategorized',
    readTime: '6 MIN READ',
    tags: ['cleaning tips', 'home maintenance', 'healthy living']
  },
  {
    id: 2,
    title: '5 Effective Ways to Eliminate Mold on Ceiling for a Healthier Home',
    slug: 'eliminate-mold-ceiling',
    excerpt: 'Learn effective methods to remove and prevent mold growth on your ceiling...',
    image: '/images/blog/mold-cleaning.png',
    date: 'Dec 10, 2024',
    author: 'Michael Brown',
    category: 'Cleaning Tips',
    readTime: '4 MIN READ',
    tags: ['mold removal', 'ceiling cleaning', 'healthy home', 'DIY cleaning']
  },
  {
    id: 3,
    title: 'Explore Best 3 DIY Carpet Cleaner Solutions: Tips for a Spotless Home',
    slug: 'diy-carpet-cleaner-solutions',
    excerpt: 'Discover effective DIY solutions for maintaining clean carpets...',
    image: '/images/blog/diy-cleaning.png',
    date: 'Dec 6, 2024',
    author: 'Emily Parker',
    category: 'Cleaning Tips',
    readTime: '4 MIN READ',
    tags: ['DIY cleaning', 'carpet care', 'stain removal', 'home maintenance']
  }
]

// Add this to your testimonials data at the top of the file
const testimonials = [
  {
    name: "Emily, Richmond",
    text: "Cleaning Professionals transformed our carpets. They were punctual, professional, and the results were outstanding. Highly recommend!"
  },
  {
    name: "Michael, Melbourne",
    text: "Our office renovation left a huge mess, but Cleaning Professionals made it look like new. Their attention to detail is exceptional. We will definitely use their services again."
  },
  {
    name: "Sarah, Brunswick",
    text: "The team was amazing! They did a fantastic end of lease cleaning and I got my full bond back. Very thorough and professional service."
  },
  {
    name: "David, South Yarra",
    text: "Regular cleaning service that never disappoints. The staff is friendly, reliable and they always go above and beyond. Highly satisfied!"
  },
  {
    name: "Lisa, Toorak",
    text: "Best cleaning service I've ever used! They're thorough, efficient, and their attention to detail is remarkable. My home has never looked better."
  },
  {
    name: "James, St Kilda",
    text: "Exceptional service from start to finish. The team was professional, friendly, and did an amazing job with our office cleaning. Will definitely use again!"
  }
]

export default function HomePage() {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trustedOrgs.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialPage((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500">
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <h3 className="font-bold">{testimonial.name}</h3>
          <div className="flex text-[#FFA500]">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="italic text-gray-600">&quot{testimonial.text}&quot</p>
    </div>
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[800px]">
        <Image
          src="/images/hero-bg.webp"
          alt="Professional Cleaning Services"
          fill
          className="object-cover object-center brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white pt-28 md:pt-24">
              <div className="mb-4 md:mb-6 hidden md:block">
                <span className="text-xs md:text-sm uppercase tracking-wider">
                  PROFESSIONAL CLEANING SERVICES IN AUSTRALIA
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight md:leading-normal">
                Cleaning Professionals Melbourne |<br className="hidden md:block" />
                Your Trusted Partner for a&nbsp;<br className="hidden md:block" />
                Cleaner, Healthier Space
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 leading-relaxed opacity-90">
                Discover expert cleaning services across Australia with Professional Cleaners Australia. 
                From general house cleaning to specialized upholstery and commercial cleaning, 
                our dedicated team ensures your property sparkles.
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <Link 
                  href="/get-quote"
                  className="w-full md:w-auto bg-[#FFA500] text-white px-4 md:px-8 py-3 md:py-3 text-sm md:text-lg font-semibold hover:bg-opacity-80 transition-all duration-200 text-center flex items-center justify-center"
                >
                  REQUEST A QUOTE
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link 
                  href="/quick-book"
                  className="w-full md:w-auto bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] px-4 md:px-8 py-3 text-sm md:text-lg font-semibold hover:bg-[#1E3D8F] hover:text-white transition-all duration-200 text-center flex items-center justify-center"
                >
                  Quick Book
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section with Quick Enquiry Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* About Company Content */}
            <div className="lg:w-2/3">
              <div className="mb-12">
                <span className="text-sm uppercase tracking-wider">ABOUT COMPANY</span>
                <h2 className="text-4xl font-bold mt-2">Committed to Keeping Your Home Squeaky Clean</h2>
              </div>
              
              <div className="max-w-3xl">
                <p className="text-gray-600 mb-6">
                  At Cleaning Professionals Melbourne, Australia, we believe a clean environment is the foundation for a healthy and productive lifestyle. Serving households and businesses across Australia, we specialize in delivering tailored cleaning solutions to meet the unique needs of every property type. All our industry best practices make us one of the best cleaning services in melbourne area.
                </p>
                <p className="text-gray-600 mb-8">
                  Whether you&aposre seeking comprehensive home cleaning, detailed office upkeep, or specific services like carpet or window cleaning, our team of experienced professionals ensures spotless results every time. With a focus on eco-friendly and child-safe methods, we provide a thorough clean without compromising the safety of your home or workplace.
                </p>
                <Link href="/about" className="text-[#1E3D8F] hover:underline">
                  Learn more about Cleaning Professionals
                </Link>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="lg:w-1/3">
              <QuickEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#1E3D8F] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wider">HOW IT WORKS</span>
            <h2 className="text-4xl font-bold mt-2">
              Get amazing cleaning<br />
              in 3 simple steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Choose a Service</h3>
              <p>
                Select the cleaning service you need from our wide range of options. Whether it&aposs end of lease cleaning, carpet cleaning, or regular house cleaning, we have you covered.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
              <p>
                Schedule a convenient time for our professional cleaners to visit. We offer flexible booking options to fit your schedule, including weekends and holidays.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Enjoy Clean Space</h3>
              <p>
                Sit back and relax while our experienced team transforms your space. We ensure thorough cleaning and complete satisfaction with every service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                <span className="text-xs md:text-sm uppercase tracking-wider text-center">SERVICES</span>
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
              </div>
              <h2 className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-0">
                Our Comprehensive&nbsp;<br className="hidden md:block" />
                Cleaning Services
              </h2>
              {/* Mobile More Services Button */}
              <Link 
                href="/services"
                className="w-full bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] px-4 py-3 text-sm font-semibold hover:bg-[#1E3D8F] hover:text-white transition-all duration-200 text-center mt-4 block md:hidden"
              >
                MORE SERVICES
              </Link>
            </div>
            {/* Desktop More Services Button */}
            <Link 
              href="/services"
              className="hidden md:block bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-opacity-90"
            >
              MORE SERVICES
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-visible relative group hover:shadow-xl transition-all duration-300 flex flex-col h-full mt-6">
                {service.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-md">
                    Popular
                  </div>
                )}
                <div className="relative h-64 overflow-hidden rounded-t-lg">
            <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                      <span className="text-[#1E3D8F] font-bold text-xl">{service.price}</span>
                      <Link 
                        href={`/services/${service.slug}`}
                        className="text-[#1E3D8F] text-right md:text-left hover:text-opacity-80 transition-all duration-200"
                      >
                        See Pricing
                      </Link>
                    </div>
                    <div className="pt-3 border-t">
                      <Link 
                        href={`/book-now?service=${service.slug}`}
                        className="block w-full text-center bg-[#1E3D8F] text-white py-3 rounded-md hover:bg-opacity-90 font-medium transition-all duration-200"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Organizations Section */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs md:text-sm uppercase tracking-wider">
              TRUSTED BY OUR LOCAL ORGANIZATIONS
            </span>
          </div>
          
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-6 gap-8 items-center">
            {trustedOrgs.map((org) => (
              <div key={org.name} className="flex justify-center">
                <Image
                  src={org.image}
                  alt={org.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {trustedOrgs.map((org) => (
                <div 
                  key={org.name} 
                  className="w-full flex-shrink-0 flex justify-center px-4"
        >
          <Image
                    src={org.image}
                    alt={org.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {trustedOrgs.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-[#1E3D8F] w-4' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with improved overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/founder-bg.jpg"
            alt="Cleaning Professionals Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1E3D8F]/95 to-[#1E3D8F]/80" />
        </div>

        <div className="container mx-auto px-4 relative max-w-6xl">
          {/* Content */}
          <div className="ml-auto lg:w-1/2">
            <div className="mb-8">
              <span className="inline-block border-b-2 border-white pb-1 text-xs md:text-sm uppercase tracking-wider font-semibold text-white">
                FOUNDER&apos;S MESSAGE
              </span>
            </div>

            <blockquote className="text-base md:text-lg italic font-light leading-relaxed mb-6 md:mb-8 text-white">
              &quotAs people are getting busy in their work life, it is so difficult for them to manage time for cleaning their spaces by own. So here we understand people&aposs problems and help them with cleanings.&quot
            </blockquote>

            <div className="mb-12 md:mb-16">
              <p className="text-lg md:text-xl font-bold text-white">Priti Ale</p>
              <p className="text-sm md:text-base text-white/90">Founder, Cleaning Professionals</p>
            </div>

            {/* Stats Section - 2x2 Grid on Mobile */}
            <div className="grid grid-cols-2 md:flex md:justify-between items-center text-white gap-8 md:gap-0">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={740} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  CLEAN HOMES
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={35} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  PROFESSIONAL STAFFS
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  HAPPY CLIENTS
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={4} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  YEARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header - Centered for all screens */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
            <span className="text-xs md:text-sm uppercase tracking-wider text-center">
              TESTIMONIALS
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
          </div>
          <h2 className="text-xl md:text-4xl font-bold text-center mb-12">
            Trusted by thousand of<br className="hidden md:block" />
            people & companies.
          </h2>

          {/* Testimonials Slider - Same for both Mobile and Desktop */}
          <div className="max-w-4xl mx-auto relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialPage * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
            
            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonialPage === index ? 'bg-[#1E3D8F] w-4' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonialPage(index)}
                />
              ))}
            </div>

            {/* Google Reviews Rating */}
            <div className="mt-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Image 
                    src="/images/google-logo.png" 
                    alt="Google" 
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                  <div>
                    <div className="font-bold text-lg">Rating</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">5.0</span>
                      <div className="flex text-[#FFA500]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xl">★</span>
                        ))}
                      </div>
                      <span className="text-gray-500">(89 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Write a Review Button */}
            <div className="flex justify-center mt-8">
              <Link 
                href="https://g.page/r/CatIouiPpkIsEAE/review"
          target="_blank"
          rel="noopener noreferrer"
                className="bg-[#1E3D8F] text-white px-6 py-2.5 rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2"
              >
                Write a Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                  <span className="text-xs md:text-sm uppercase tracking-wider text-center md:text-left">
                    WHY CHOOSE US
                  </span>
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                </div>
                <h2 className="text-xl md:text-4xl font-bold text-center md:text-left mb-12">
                  Why Choose Cleaning<br className="hidden md:block" />
                  Professionals?
                </h2>
              </div>
              <p className="text-gray-600 mb-8">
                At Cleaning Professionals Australia, we believe that a clean space is essential for both comfort and well-being. With years of experience serving homes and businesses across Australia, we have built a reputation for excellence, reliability, and a commitment to customer satisfaction. Our skilled team of cleaning experts uses top-of-the-line equipment and eco-friendly products to deliver the best possible results for our clients.
              </p>
              <Link href="/about" className="text-[#1E3D8F] hover:underline">
                Read More About Cleaning Professionals
              </Link>
            </div>

            {/* Right Content - Features */}
            <div className="lg:w-1/2">
              <div className="grid gap-8 mt-[52px]">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Experienced and Trained Cleaners:</h3>
                    <p className="text-gray-600">All our professionals are thoroughly vetted and highly trained, ensuring the highest standards of cleanliness.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Flexible Scheduling:</h3>
                    <p className="text-gray-600">We offer flexible cleaning schedules, allowing you to book services at times that suit you.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6c0 1.1.9 2 2 2h14a2 2 0 002-2v0a2 2 0 00-2-2H5a2 2 0 00-2 2v0zm3 6h14M6 18h14" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Eco-Friendly Solutions:</h3>
                    <p className="text-gray-600">We prioritize using environmentally friendly products that are safe for you, your family, and the environment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comprehensive Services:</h3>
                    <p className="text-gray-600">We provide a wide array of cleaning services for residential, commercial, and specialized needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="relative bg-[#1E3D8F] text-white py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            
            src="/images/cost-calculator-bg.jpg" // Make sure to add this image to your public folder
            alt="Cleaning Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 md:w-12 h-[1px] bg-white/30"></div>
              <span className="text-xs md:text-sm uppercase tracking-wider text-center">
                COST CALCULATOR
              </span>
              <div className="w-8 md:w-12 h-[1px] bg-white/30"></div>
            </div>
            <h2 className="text-xl md:text-4xl font-bold text-center mb-12">
              Be a part of hundreds<br className="hidden md:block" />
              of happy families.
            </h2>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Choose a Service</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all text-gray-600">
                  <option>General House Cleaning</option>
                  <option>End of Lease Cleaning</option>
                  <option>Carpet Cleaning</option>
                  <option>Window Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Type of Clean</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all text-gray-600">
                  <option>Full Cleaning</option>
                  <option>Basic Cleaning</option>
                  <option>Deep Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3D8F]/20 focus:border-[#1E3D8F] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </form>

            <div className="px-4 md:px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <button className="w-full md:w-[350px] bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] md:border-0 md:bg-[#FFA500] md:text-white py-3 md:py-4 font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-200">
                  SUBMIT
                </button>
                <p className="text-gray-500 text-xs md:text-sm italic text-center md:text-left">
                  Submit this information and we will send you the cost for the service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                <span className="text-xs md:text-sm uppercase tracking-wider text-center">BLOG</span>
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
              </div>
              <h2 className="text-xl md:text-4xl font-bold mt-2 mb-4 md:mb-0">
                Tips to keep the&nbsp;<br className="hidden md:block" />
                surroundings clean.
              </h2>
              <Link 
                href="/blog"
                className="w-full md:w-auto bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] md:border-0 md:bg-[#FFA500] md:text-white px-4 md:px-6 py-3 md:py-3 text-sm md:text-base hover-[#1E3D8F] hover:text-white md:hover:bg-opacity-90 transition-all duration-200 text-center mt-4 block md:hidden"
              >
                VIEW ALL POSTS
              </Link>
            </div>
            {/* Desktop View All Posts button */}
            <Link 
              href="/blog"
              className="hidden md:block bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200"
            >
              VIEW ALL POSTS
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  {/* Blog Meta Info - Only visible on desktop */}
                  <div className="hidden md:flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag size={16} />
                      <span>Cleaning Tips</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[#1E3D8F] hover:text-[#FFA500] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
    </div>
      </section>

      <SubscriptionSection />
    </MainLayout>
  )
}