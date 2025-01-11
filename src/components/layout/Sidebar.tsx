'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Settings, Calendar, CheckCircle } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    id: 'location',
    label: 'Location',
    path: '/quick-book',
    icon: <MapPin className="w-5 h-5" />
  },
  {
    id: 'service',
    label: 'Service',
    path: '/quick-book/service',
    icon: <Settings className="w-5 h-5" />
  },
  {
    id: 'details',
    label: 'Details',
    path: '/quick-book/details',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: 'confirmation',
    label: 'Confirmation',
    path: '/quick-book/confirmation',
    icon: <CheckCircle className="w-5 h-5" />
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  
  const getCurrentStepIndex = () => {
    return navItems.findIndex(item => pathname === item.path)
  }

  const currentStep = getCurrentStepIndex()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 pt-24
      hidden md:block">
      <nav className="px-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isClickable = index <= currentStep

            return (
              <li key={item.id}>
                <Link
                  href={isClickable ? item.path : '#'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isCompleted 
                      ? 'text-[#1E3D8F] hover:bg-[#e6f0fa]' 
                      : isCurrent
                        ? 'text-[#1E3D8F] bg-[#e6f0fa]'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  onClick={(e) => {
                    if (!isClickable) {
                      e.preventDefault()
                    }
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 ml-auto text-[#1E3D8F]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
} 