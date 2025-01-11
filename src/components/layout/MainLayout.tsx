'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Breadcrumb */}
      {pathname !== '/' && (
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#1E3D8F]">
                Home
              </Link>
              {pathSegments.map((segment, index) => (
                <div key={segment} className="flex items-center space-x-2">
                  <ChevronRight size={16} className="text-gray-400" />
                  <Link
                    href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                    className={`capitalize ${
                      index === pathSegments.length - 1
                        ? 'text-[#1E3D8F] font-medium'
                        : 'text-gray-500 hover:text-[#1E3D8F]'
                    }`}
                  >
                    {segment.replace(/-/g, ' ')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  )
} 