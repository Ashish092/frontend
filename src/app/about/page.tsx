import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import { Award, Users, Clock, Shield } from 'lucide-react'
import SubscriptionSection from '@/components/features/SubscriptionSection'

const stats = [
  { icon: Award, label: 'Years Experience', value: '4+' },
  { icon: Users, label: 'Happy Customers', value: '10k+' },
  { icon: Clock, label: 'Hour Booking', value: '24hr' },
  { icon: Shield, label: 'Satisfaction Rate', value: '99%' },
]

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-1">
          <Image
            src="/images/about-hero.jpg"
            alt="About Cleaning Professionals"
            fill
            className="object-cover"
          />
          {/* Gradient Overlay: left (100% opacity) to right (0% opacity) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D8F] to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <span className="text-xs md:text-sm uppercase tracking-wider">
                ABOUT CLEANING PROFESSIONALS
              </span>
              <h1 className="text-2xl md:text-5xl font-bold mt-4 mb-4 md:mb-6 leading-tight md:leading-normal">
                Your Trusted Cleaning<br />
                Partner in Australia
              </h1>
              <p className="text-base md:text-xl leading-relaxed">
                Welcome to Cleaning Professionals Australia, your premier choice for top-notch cleaning services across Australia.
              </p>
              <p className="mt-4 md:mt-6 text-sm md:text-base opacity-90">
                Since our establishment, we have been committed to delivering exceptional cleaning solutions tailored to meet the diverse needs of our clients.
              </p>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Core Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-sm uppercase tracking-wider text-gray-600">OUR GOAL</span>
              <h2 className="text-4xl font-bold text-[#1E3D8F] mt-2">Core Mission</h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                At Cleaning Professionals Australia, our core mission is to enhance the cleanliness and hygiene of spaces across Australia through reliable and professional cleaning services.
              </p>

              <p>
                We strive to exceed client expectations by combining our extensive experience with innovative cleaning techniques and eco-friendly practices.
              </p>

              <p>
                Our goal is to create environments where our clients can feel comfortable, productive, and proud of their surroundings.
              </p>

              <p>
                Our mission is not just about cleaning; it&apos;s about delivering peace of mind and a sense of well-being. We are driven by a passion for service excellence and a commitment to upholding the highest standards in every project we undertake.
              </p>

              <p>
                By focusing on our clients needs and continuously improving our services, we aim to be the most trusted cleaning partner in Australia.
              </p>

              <p>
                Cleaning Professionals began as a vision to provide a comprehensive suite of domestic services for all property types within Melbourne. With a commitment to deliver more than just cleaning, we&apos;ve become a distinguished service provider.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/images/about-cleaning.jpg"
              alt="Professional Cleaning Service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon size={40} className="mx-auto mb-4 text-[#1E3D8F]" />
              <div className="text-3xl font-bold text-[#1E3D8F] mb-2">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-sm uppercase tracking-wider text-gray-600">WHY CHOOSE US</span>
              <h2 className="text-4xl font-bold text-[#1E3D8F] mt-2">
                Why Choose Cleaning Professionals Australia
              </h2>
              <p className="text-lg text-gray-600 mt-4">A Leader in Melbourne Cleaning Services</p>
            </div>

            <div className="text-gray-600">
              <p>
                At Cleaning Professionals Australia, we understand that choosing a cleaning service provider in Melbourne is a critical decision. Here&apos;s why we are the top choice for your cleaning needs and have become the trusted name across Melbourne&apos;s diverse suburbs:
              </p>
            </div>

            <div className="space-y-6">
              {/* Exemplary Service Standards */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Commitment to Exemplary Service Standards</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We set the benchmark for excellence in cleaning with our unwavering dedication to quality. Every task, from routine home cleaning to complex commercial maintenance, is executed with precision using the latest technology and industry-leading methods.</p>
                    <p>State-of-the-Art Equipment - Our arsenal includes the latest in cleaning technology, ensuring efficient and thorough service.</p>
                    <p>Rigorous Quality Checks - We perform detailed inspections post-cleaning to guarantee that every service adheres to our strict quality standards.</p>
                    <p>Attention to Detail - Our team&apos;s meticulous approach means no detail is overlooked, ensuring pristine results every time.</p>
                  </div>
                </div>
              </div>

              {/* Eco-Friendly Solutions */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Eco-Friendly and Sustainable Practices</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Dedicated to sustainability, we use eco-friendly cleaning solutions that are both effective and safe for your family and pets, supporting a healthier environment.</p>
                    <p>Green Cleaning Products - Our non-toxic, biodegradable products significantly reduce environmental impact.</p>
                    <p>Sustainable Practices - We focus on reducing waste and conserving energy, aligning our operations with eco-friendly principles.</p>
                    <p>Child and Pet Safe - Our treatments are specifically selected for their safety to ensure peace of mind for all household members.</p>
                  </div>
                </div>
              </div>

              {/* Trusted Professionals */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Trusted Cleaning Professionals</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Our team is what makes us stand out. Each cleaner is carefully chosen and rigorously trained to meet our high standards of service and reliability.</p>
                    <p>Experienced Technicians - Our cleaners bring years of expertise to effectively handle all residential and commercial cleaning needs.</p>
                    <p>Background Checks - We ensure the safety and security of your premises with thorough background screenings.</p>
                    <p>Friendly Service - Known for our courteous approach, we make every interaction pleasant and respectful.</p>
                  </div>
                </div>
              </div>

              {/* Best Equipment */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Investment in Top-Tier Equipment</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We believe the quality of our tools directly enhances the quality of our services. That&apos;s why we continuously invest in the best and most efficient cleaning equipment available.</p>
                    <p>High-Performance Tools - From advanced vacuum systems to professional-grade steam cleaners, our equipment is designed for superior performance.</p>
                    <p>Regular Maintenance - We maintain our equipment regularly to ensure it operates at peak efficiency.</p>
                    <p>Innovative Cleaning Solutions - We stay at the forefront of the cleaning industry, incorporating the latest advancements and techniques.</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          {/* Image */}
          <div className="relative h-[1200px] rounded-lg overflow-hidden">
            <Image
              src="/images/about-why-choose.jpg"
              alt="Professional Cleaning Service"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="text-center max-w-2xl mx-auto mt-16">
          <p className="text-gray-600 italic leading-relaxed">
            Choose Cleaning Professionals Australia for Reliable,
            Efficient, and Eco-Friendly Cleaning Solutions in Melbourne.
            Experience the difference with a team that goes above and beyond.
          </p>
        </div>
      </section>

      {/* Comprehensive Cleaning Services Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-[#1E3D8F] mb-6">
          Comprehensive Cleaning Services for Every Need
        </h2>
        <p className="text-gray-600 mb-12 max-w-4xl">
          At <span className="font-semibold">Cleaning Professionals Australia</span>, we offer a wide range of cleaning services designed to meet the diverse needs of our clients. Whether you require regular home maintenance, specialized cleaning, or commercial facility upkeep, we have the expertise and resources to deliver exceptional results.
        </p>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Residential Cleaning */}
          <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full">
            <div className="w-16 h-16 text-[#FFA500] transform transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1E3D8F] min-h-[3rem]">Residential Cleaning</h3>
            <div className="space-y-3 text-gray-600">
              <p>Our residential cleaning services are tailored to create a clean, healthy, and welcoming environment for your home. We handle all aspects of home cleaning with precision and care.</p>
              <p><span className="font-semibold">Routine Home Cleaning:</span> Regular cleaning to maintain a pristine and comfortable living space.</p>
              <p><span className="font-semibold">Spring Cleaning:</span> Thorough, deep cleaning to refresh your home and tackle those hard-to-reach areas.</p>
              <p><span className="font-semibold">Vacate Cleaning:</span> Comprehensive cleaning services to ensure your property is spotless when moving out.</p>
            </div>
          </div>

          {/* Residential and Commercial Premises Cleaning */}
          <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full">
            <div className="w-16 h-16 text-[#FFA500] transform transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1E3D8F] min-h-[3rem]">Residential and Commercial Premises Cleaning</h3>
            <div className="space-y-3 text-gray-600">
              <p>Maintaining a clean and professional environment is crucial for any business. Our commercial cleaning services are designed to keep your business premises in top condition.</p>
              <p><span className="font-semibold">Office Cleaning:</span> Regular cleaning and maintenance for a clean and productive workspace.</p>
              <p><span className="font-semibold">High-Pressure Surface Cleaning:</span> Effective cleaning for exterior surfaces to remove grime and build-up.</p>
              <p><span className="font-semibold">Detailed Facility Cleaning:</span> Customized cleaning solutions for various types of commercial spaces, ensuring a hygienic and inviting atmosphere.</p>
            </div>
          </div>

          {/* Specialized Cleaning Services */}
          <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full">
            <div className="w-16 h-16 text-[#FFA500] transform transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1E3D8F] min-h-[3rem]">Specialized Cleaning Services</h3>
            <div className="space-y-3 text-gray-600">
              <p>In addition to our standard cleaning offerings, we provide specialized services to address unique cleaning needs.</p>
              <p><span className="font-semibold">Upholstery and Carpet Cleaning:</span> Deep cleaning and stain removal for carpets, sofas, and other upholstered furniture.</p>
              <p><span className="font-semibold">Oven and BBQ Maintenance:</span> Thorough cleaning of ovens and BBQs to restore their functionality and appearance.</p>
              <p><span className="font-semibold">Ducted Heating Services:</span> Cleaning and maintenance of ducted heating systems for optimal performance and air quality.</p>
              <p><span className="font-semibold">Window Washing:</span> Streak-free window cleaning for a clear and bright view.</p>
            </div>
          </div>
        </div>

        {/* New centered bottom text */}
        <div className="text-center max-w-2xl mx-auto mt-16">
          <p className="text-gray-600 italic leading-relaxed">
            Choose Cleaning Professionals Australia for Reliable,<br />
            Efficient, and Eco-Friendly Cleaning Solutions in Melbourne.<br />
            Experience the difference with a team that goes above and beyond.
          </p>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#1E3D8F]">
              Our Commitment to You
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                Choosing <span className="font-semibold">Cleaning Professionals Australia</span> means 
                choosing a company that values <span className="text-[#1E3D8F]">excellence</span>, 
                <span className="text-[#1E3D8F]"> sustainability</span>, and 
                <span className="text-[#1E3D8F]"> your</span> satisfaction.
              </p>
              <p>
                Our dedicated team is here to deliver the highest quality service, 
                tailored to your specific needs, and to ensure that every cleaning 
                job exceeds your expectations.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/commitment.webp"
              alt="Our Commitment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <SubscriptionSection />
    </MainLayout>
  )
} 