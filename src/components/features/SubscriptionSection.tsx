import Link from 'next/link'

export default function SubscriptionSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="p-6 md:p-12 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                  <span className="inline-block text-xs md:text-sm uppercase tracking-wider text-gray-600 text-center">SUBSCRIBE</span>
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                </div>
              </div>
              <h2 className="text-xl md:text-4xl font-bold leading-relaxed md:leading-relaxed text-gray-900 text-center md:text-left">
                Join our subscription and&nbsp;<br className="hidden md:block" />
                get instant <span className="text-[#1E3D8F]">updates</span> about&nbsp;<br className="hidden md:block" />
                <span className="text-[#1E3D8F]">offers</span> and <span className="text-[#1E3D8F]">discounts</span>.
              </h2>
            </div>

            {/* Right Content - Form */}
            <div className="lg:w-1/2 w-full">
              <form className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-xl">
                <input
                  type="email"
                  placeholder="Enter your email address to subscribe"
                  className="flex-grow px-4 md:px-6 py-3 md:py-4 rounded-lg bg-white border-2 border-gray-100 
                    text-gray-900 placeholder-gray-400 
                    focus:outline-none focus:border-[#1E3D8F] focus:ring-2 focus:ring-[#1E3D8F]/20
                    transition-all duration-200
                    text-sm md:text-base shadow-sm
                    hover:border-gray-300"
                />
                <button
                  type="submit"
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#1E3D8F] text-white rounded-lg hover:bg-opacity-90 
                    transition-all duration-200 font-semibold shadow-md text-sm md:text-base
                    hover:shadow-lg hover:transform hover:scale-[1.02]"
                >
                  Go
                </button>
              </form>
              <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
                Please read <Link href="/terms" className="text-[#1E3D8F] underline hover:text-[#FFA500] transition-colors">Terms and Conditions</Link> before subscribing to the news
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 