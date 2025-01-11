interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <>
      {/* Desktop Version - Original Design */}
      <div className="hidden md:flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-[#1E3D8F] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm">{step}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-[2px] mx-2 ${
                  index < currentStep ? 'bg-[#1E3D8F]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Version - Simple Timeline */}
      <div className="md:hidden mb-8">
        {/* Step Title */}
        <div className="text-center mb-4">
          <span className="text-sm font-medium text-[#1E3D8F]">
            Step {currentStep + 1}: {steps[currentStep]}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="relative h-1 bg-gray-200 rounded">
          <div
            className="absolute h-1 bg-[#1E3D8F] rounded transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        {/* Step Count */}
        <div className="text-right mt-1">
          <span className="text-xs text-gray-500">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>
    </>
  )
} 