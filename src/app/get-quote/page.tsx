'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import StepIndicator from '@/components/features/StepIndicator'
import { Home, Building2, Clock, ArrowRight, ArrowLeft, Phone, Brush, Hammer, Home as HomeIcon, Heart, Flame, Armchair, PanelTop, MoveRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const steps = ['Service Type', 'Property Details', 'Schedule', 'Contact Info']

const cleaningTypes = [
  { value: 'carpet-cleaning', label: 'Carpet Cleaning', icon: Brush },
  { value: 'after-renovation-cleaning', label: 'After Renovation Cleaning', icon: Hammer },
  { value: 'end-of-lease', label: 'End of Lease Cleaning', icon: HomeIcon },
  { value: 'general-house-cleaning', label: 'General House Cleaning', icon: HomeIcon },
  { value: 'ndis-cleaning', label: 'NDIS Cleaning', icon: Heart },
  { value: 'oven-cleaning', label: 'Oven Cleaning', icon: Flame },
  { value: 'upholstery-cleaning', label: 'Upholstery Cleaning', icon: Armchair },
  { value: 'window-cleaning', label: 'Window Cleaning', icon: PanelTop },
  { value: 'move-in-move-out-cleaning', label: 'Move In/Move Out Cleaning', icon: MoveRight }
]

// Add this constant for rate types
const rateTypes = [
  { value: 'hourly', label: 'Hourly Rate', icon: Clock },
  { value: 'flat', label: 'Flat Rate', icon: Building2 }
]

interface FormData {
  // Step 1: Service Type
  serviceType: string
  cleaningType: string
  frequency: string
  
  // Step 2: Property Details
  propertyType: string
  bedrooms: string
  bathrooms: string
  rateType: string
  
  // Step 3: Schedule
  preferredDate: string
  preferredTime: string
  parkingAvailable: string
  access: string
  
  // Step 4: Contact Info
  name: string
  companyName: string
  email: string
  phone: string
  streetAddress: string
  suburb: string
  state: string
  postCode: string
  notes: string
}

// Add dialog component
const CommercialDialog = ({ 
  isOpen, 
  onClose, 
  onRequestCallback, 
  onCallNow 
}: { 
  isOpen: boolean
  onClose: () => void
  onRequestCallback: () => void
  onCallNow: () => void 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold mb-4">Special Commercial Pricing</h3>
        <p className="text-gray-600 mb-6">
          For commercial cleaning services, we offer customized solutions and special pricing packages. 
          Let&apos;s have a discussion about your specific needs and find the best solution for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRequestCallback}
            className="flex-1 bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Request Callback
          </button>
          <button
            onClick={onCallNow}
            className="flex-1 bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Call Now
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Create a custom type for the simulated event
type SimulatedInputEvent = {
  target: {
    name: string;
    value: string;
  };
};

export default function GetQuotePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    cleaningType: '',
    frequency: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    rateType: '',
    preferredDate: '',
    preferredTime: '',
    parkingAvailable: '',
    access: '',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    streetAddress: '',
    suburb: '',
    state: '',
    postCode: '',
    notes: ''
  })
  const [showCommercialDialog, setShowCommercialDialog] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit quote');
      }

      const data = await response.json();
      console.log('Quote submitted successfully:', data);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to submit quote. Please try again.');
    }
  };

  const handleServiceTypeSelect = (type: string) => {
    if (type === 'commercial') {
      setShowCommercialDialog(true)
    }
    // Create a properly typed simulated event
    const simulatedEvent: SimulatedInputEvent = {
      target: { 
        name: 'serviceType', 
        value: type 
      }
    }
    // Type assertion to React.ChangeEvent
    handleInputChange(
      simulatedEvent as unknown as React.ChangeEvent<HTMLInputElement>
    )
  }

  const handleRequestCallback = () => {
    setShowCommercialDialog(false)
    setCurrentStep(3) // Jump to contact info step
  }

  const handleCallNow = () => {
    window.location.href = 'tel:0450124086'
  }

  if (isSubmitted) {
    return (
      <MainLayout>
        <div className="mt-32">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={64} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Your quote request has been successfully submitted.
                </p>
                <p className="text-gray-600 mb-8">
                  We&apos;ll get in touch with you soon to discuss your cleaning needs and provide you with a detailed quote.
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    For urgent inquiries, please contact us directly:
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Link 
                      href="tel:0450124086"
                      className="flex items-center gap-2 text-[#1E3D8F] hover:text-[#FFA500] transition-colors"
                    >
                      <Phone size={20} />
                      0450124086
                    </Link>
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white bg-[#1E3D8F] px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
                  >
                    <ArrowLeft size={20} />
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mt-32">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Get a Free Quote</h1>
            <StepIndicator steps={steps} currentStep={currentStep} />

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service Type */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            formData.serviceType === 'residential'
                              ? 'border-[#1E3D8F] text-[#1E3D8F]'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => {
                            const simulatedEvent: SimulatedInputEvent = {
                              target: { 
                                name: 'serviceType', 
                                value: 'residential'
                              }
                            }
                            handleInputChange(
                              simulatedEvent as unknown as React.ChangeEvent<HTMLInputElement>
                            )
                          }}
                        >
                          <Home size={24} className="mb-2" />
                          <span>Residential</span>
                        </button>
                        <button
                          type="button"
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            formData.serviceType === 'commercial'
                              ? 'border-[#1E3D8F] text-[#1E3D8F]'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => handleServiceTypeSelect('commercial')}
                        >
                          <Building2 size={24} className="mb-2" />
                          <span>Commercial</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cleaning Type *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {cleaningTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.value}
                              type="button"
                              className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                                formData.cleaningType === type.value
                                  ? 'border-[#1E3D8F] text-[#1E3D8F]'
                                  : 'hover:border-gray-300'
                              }`}
                              onClick={() => {
                                const simulatedEvent: SimulatedInputEvent = {
                                  target: { 
                                    name: 'cleaningType', 
                                    value: type.value 
                                  }
                                }
                                handleInputChange(
                                  simulatedEvent as unknown as React.ChangeEvent<HTMLInputElement>
                                )
                              }}
                            >
                              <Icon size={24} className="mb-2" />
                              <span className="text-center text-sm">{type.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cleaning Frequency</label>
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                      >
                        <option value="">Select frequency</option>
                        <option value="one-time">One-time</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                      >
                        <option value="">Select property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="townhouse">Town House</option>
                        <option value="office">Office</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Bedrooms</label>
                        <select
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Bathrooms</label>
                        <select
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Rate Type *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {rateTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.value}
                              type="button"
                              className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                                formData.rateType === type.value
                                  ? 'border-[#1E3D8F] text-[#1E3D8F]'
                                  : 'hover:border-gray-300'
                              }`}
                              onClick={() => {
                                const simulatedEvent: SimulatedInputEvent = {
                                  target: { 
                                    name: 'rateType', 
                                    value: type.value 
                                  }
                                }
                                handleInputChange(
                                  simulatedEvent as unknown as React.ChangeEvent<HTMLInputElement>
                                )
                              }}
                            >
                              <Icon size={24} className="mb-2" />
                              <span>{type.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Time</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 8PM)</option>
                      </select>
                    </div>

                    {/* Parking Available */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Parking Available</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="parkingAvailable"
                            value="yes"
                            checked={formData.parkingAvailable === 'yes'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="parkingAvailable"
                            value="no"
                            checked={formData.parkingAvailable === 'no'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {/* Access Options */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Access</label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="access"
                            value="will-be-home"
                            checked={formData.access === 'will-be-home'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>I will be home</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="access"
                            value="send-someone"
                            checked={formData.access === 'send-someone'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>I will send someone</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="access"
                            value="give-keys"
                            checked={formData.access === 'give-keys'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>I will give access to the keys</span>
                        </label>
                      </div>
                    </div>

                    {/* Additional Notes / Special Requests */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes or Special Requests</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Please let us know if you have any special requirements or specific areas that need attention..."
                        rows={4}
                        className="w-full p-3 border rounded-lg resize-none"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Optional: Include any specific cleaning requirements, areas of concern, or special instructions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Info */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company Name
                          <span className="text-gray-500 text-sm ml-1">(If applicable)</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    {/* Address Fields */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., 123 Main Street"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Suburb *</label>
                        <input
                          type="text"
                          name="suburb"
                          value={formData.suburb}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          required
                        >
                          <option value="">Select state</option>
                          <option value="VIC">VIC</option>
                          <option value="NSW">NSW</option>
                          <option value="QLD">QLD</option>
                          <option value="WA">WA</option>
                          <option value="SA">SA</option>
                          <option value="TAS">TAS</option>
                          <option value="ACT">ACT</option>
                          <option value="NT">NT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Post Code *</label>
                        <input
                          type="text"
                          name="postCode"
                          value={formData.postCode}
                          onChange={handleInputChange}
                          maxLength={4}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-gray-600 hover:text-[#1E3D8F]"
                    >
                      <ArrowLeft size={20} className="mr-2" />
                      Previous
                    </button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center ml-auto text-white bg-[#1E3D8F] px-6 py-2 rounded-md hover:bg-opacity-90"
                    >
                      Next
                      <ArrowRight size={20} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center ml-auto text-white bg-[#FFA500] px-6 py-2 rounded-md hover:bg-opacity-90"
                    >
                      Get Quote
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Add the dialog */}
      <CommercialDialog
        isOpen={showCommercialDialog}
        onClose={() => setShowCommercialDialog(false)}
        onRequestCallback={handleRequestCallback}
        onCallNow={handleCallNow}
      />
    </MainLayout>
  )
} 