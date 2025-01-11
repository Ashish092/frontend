'use client'

import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'

interface Step {
  id: string
  label: string
  path: string
}

const steps: Step[] = [
  { id: 'location', label: 'Location', path: '/quick-book' },
  { id: 'service', label: 'Service', path: '/quick-book/service' },
  { id: 'details', label: 'Details', path: '/quick-book/details' },
  { id: 'confirmation', label: 'Confirmation', path: '/quick-book/confirmation' }
]

export default function BookingProgress() {
  const pathname = usePathname()
  const currentStep = steps.findIndex(step => pathname === step.path)
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="mb-6 md:hidden">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-gray-500">{steps[currentStep]?.label}</span>
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1E3D8F] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress Steps */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center relative">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full 
                      ${isCompleted 
                        ? 'bg-[#1E3D8F] text-white' 
                        : isCurrent
                          ? 'bg-[#1E3D8F] text-white'
                          : 'bg-gray-200 text-gray-600'
                      } transition-colors`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium whitespace-nowrap
                      ${isCurrent ? 'text-[#1E3D8F]' : 'text-gray-500'}`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4
                      ${index < currentStep ? 'bg-[#1E3D8F]' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 