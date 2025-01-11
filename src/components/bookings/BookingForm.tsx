'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Mail, Phone, MapPin, ArrowDownToLine, Info } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ContactSearch from '@/components/contacts/ContactSearch';
import { Contact } from '@/types/contact';

interface ServiceExtra {
    name: string;
    price: number;
}

interface BookingService {
    serviceId: string;
    name: string;
    hours: number;
    amount: number;
    extras: ServiceExtra[];
    isCustom?: boolean;
}

interface ScheduleOption {
    date: string;
    startTime: string;
    bufferMinutes: number;
    endTime: string;
}

interface BookingFormData {
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    address: {
        street: string;
        suburb: string;
        city: string;
        state: string;
        postcode: string;
    };
    schedule: ScheduleOption;
    services: BookingService[];
    notes: string;
    status: string;
    tags: string[];
    isFlexibleTime: boolean;
    isFlexibleDate: boolean;
    alternativeDates: ScheduleOption[];
    alternativeTimes: Array<{
        startTime: string;
        bufferMinutes: number;
        endTime: string;
    }>;
    propertyDetails: {
        pets: {
            present: boolean;
            details: string;
        };
        equipment: {
            clientProvided: boolean;
            companyProvided: boolean;
            details: string;
        };
        parking: {
            type: 'onsite' | 'street' | 'none' | '';
            instructions: string;
        };
    };
    frequency: {
        isRecurring: boolean;
        times: number;
        period: 'weekly' | 'fortnightly' | '3weekly' | 'monthly' | '';
    };
    payment: {
        method: 'bank' | 'cash' | 'card' | '';
        timing: 'onDay' | 'now' | 'partial';
        partialAmount?: number;
        notes: string;
    };
}

interface AdminService {
    _id: string;
    name: string;
    description: string;
    duration: number;
    basePrice: number;
    priceType: 'fixed' | 'hourly';
    category: string;
    extras: Array<{
        name: string;
        price: number;
        description: string;
    }>;
}

interface BookingFormProps {
    id?: string;
    initialData?: BookingFormData;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

// Add a more specific type for nested form data
type NestedRecord = Record<string, FormFieldValue>;

// Add a type for extra field updates
type ExtraFieldValue = string | number;

// Add a type for the form field values
type FormFieldValue = string | number | boolean;

interface FormDataUpdate {
    name: string;
    email: string;
    phone: string;
    street?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
}

interface CustomServiceData {
    serviceName: string;
    duration: string;
    price: string;
}

type ServiceFieldValue = string | number | boolean;

export default function BookingForm({ id, initialData }: BookingFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<BookingFormData>(initialData || {
        customer: {
            name: '',
            email: '',
            phone: ''
        },
        address: {
            street: '',
            suburb: '',
            city: '',
            state: '',
            postcode: ''
        },
        schedule: {
            date: new Date().toISOString().split('T')[0],
            startTime: '09:00',
            bufferMinutes: 15,
            endTime: '09:15'
        },
        services: [],
        notes: '',
        status: 'pending',
        tags: [],
        isFlexibleTime: false,
        isFlexibleDate: false,
        alternativeDates: [],
        alternativeTimes: [],
        propertyDetails: {
            pets: {
                present: false,
                details: ''
            },
            equipment: {
                clientProvided: false,
                companyProvided: true,
                details: ''
            },
            parking: {
                type: '',
                instructions: ''
            }
        },
        frequency: {
            isRecurring: false,
            times: 1,
            period: ''
        },
        payment: {
            method: '',
            timing: 'onDay',
            notes: ''
        }
    });
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [services, setServices] = useState<AdminService[]>([]);
    
    const [showCustomServiceModal, setShowCustomServiceModal] = useState(false);
    
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    'http://localhost:5000/api/admin-services',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                if (response.data.success) {
                    setServices(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                toast.error('Failed to load services');
            }
        };

        fetchServices();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof BookingFormData] as NestedRecord),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = id 
                ? `http://localhost:5000/api/manual-bookings/${id}`
                : 'http://localhost:5000/api/manual-bookings';
            
            const method = id ? 'put' : 'post';
            
            const response = await axios({
                method,
                url,
                data: formData,
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                toast.success(id ? 'Booking updated successfully' : 'Manual booking created successfully');
                router.push('/admin/bookings/manual');
            }
        } catch (err: unknown) {
            const error = err as ApiError;
            console.error('Error saving booking:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to save booking');
        } finally {
            setSaving(false);
        }
    };

    const handleContactSelect = (contact: Contact) => {
        setSelectedContact(contact);
        const formDataUpdate: FormDataUpdate = {
            name: `${contact.firstName} ${contact.lastName}`,
            email: contact.email || '',
            phone: contact.phone || '',
            street: contact.address?.street || '',
            suburb: contact.address?.suburb || '',
            city: contact.address?.city || '',
            state: contact.address?.state || '',
            postcode: contact.address?.postcode || ''
        };

        setFormData(prev => ({
            ...prev,
            customer: {
                name: formDataUpdate.name,
                email: formDataUpdate.email,
                phone: formDataUpdate.phone
            },
            address: {
                street: formDataUpdate.street || '',
                suburb: formDataUpdate.suburb || '',
                city: formDataUpdate.city || '',
                state: formDataUpdate.state || '',
                postcode: formDataUpdate.postcode || ''
            }
        }));
    };

    const handleClearContact = () => {
        setSelectedContact(null);
        setFormData(prev => ({
            ...prev,
            customer: {
                name: '',
                email: '',
                phone: ''
            },
            address: {
                street: '',
                suburb: '',
                city: '',
                state: '',
                postcode: ''
            }
        }));
    };

    const handleServiceSelect = async (serviceId: string) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/services/${serviceId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const service = response.data;
            const bookingService: BookingService = {
                serviceId: service._id,
                name: service.name,
                hours: service.duration,
                amount: service.basePrice,
                extras: []
            };

            setFormData(prev => ({
                ...prev,
                services: [...prev.services, bookingService]
            }));
        } catch (err: unknown) {
            const error = err as ApiError;
            console.error('Error fetching service:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to add service');
        }
    };

    const handleAddCustomService = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
            const customData: CustomServiceData = {
                serviceName: formData.get('serviceName') as string,
                duration: formData.get('duration') as string,
                price: formData.get('price') as string
            };

            if (!customData.serviceName || !customData.duration || !customData.price) {
                throw new Error('All fields are required');
            }

            const customService: BookingService = {
                serviceId: 'custom',
                name: customData.serviceName,
                hours: parseFloat(customData.duration),
                amount: parseFloat(customData.price),
                extras: [],
                isCustom: true
            };

            setFormData(prev => ({
                ...prev,
                services: [...prev.services, customService]
            }));
            setShowCustomServiceModal(false);
            form.reset();
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Error adding custom service:', error);
            toast.error(error.message || 'Failed to add custom service');
        }
    };

    const updateServiceField = (
        index: number, 
        field: keyof BookingService, 
        value: ServiceFieldValue
    ) => {
        setFormData(prev => {
            const updatedServices = [...prev.services];
            updatedServices[index] = {
                ...updatedServices[index],
                [field]: value
            };
            return {
                ...prev,
                services: updatedServices
            };
        });
    };

    const updateServiceExtra = (
        serviceIndex: number, 
        extraIndex: number, 
        field: keyof ServiceExtra, 
        value: ExtraFieldValue
    ) => {
        setFormData(prev => {
            const updatedServices = [...prev.services];
            const updatedExtras = [...updatedServices[serviceIndex].extras];
            updatedExtras[extraIndex] = {
                ...updatedExtras[extraIndex],
                [field]: value
            };
            updatedServices[serviceIndex] = {
                ...updatedServices[serviceIndex],
                extras: updatedExtras
            };
            return {
                ...prev,
                services: updatedServices
            };
        });
    };

    const removeService = (index: number) => {
        setFormData(prev => {
            const updatedServices = [...prev.services];
            updatedServices.splice(index, 1);
            return {
                ...prev,
                services: updatedServices
            };
        });
    };

    const removeServiceExtra = (serviceIndex: number, extraIndex: number) => {
        setFormData(prev => {
            const updatedServices = [...prev.services];
            updatedServices[serviceIndex] = {
                ...updatedServices[serviceIndex],
                extras: updatedServices[serviceIndex].extras.filter((_, i) => i !== extraIndex)
            };
            return {
                ...prev,
                services: updatedServices
            };
        });
    };

    const addServiceExtra = (serviceIndex: number) => {
        setFormData(prev => {
            const updatedServices = [...prev.services];
            if (!updatedServices[serviceIndex].extras) {
                updatedServices[serviceIndex].extras = [];
            }
            updatedServices[serviceIndex].extras.push({
                name: '',
                price: 0
            });
            return {
                ...prev,
                services: updatedServices
            };
        });
    };

    const calculateEndTime = (startTime: string, bufferMinutes: number): string => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes + bufferMinutes);
        return date.toTimeString().slice(0, 5);
    };

    const handleScheduleChange = (field: string, value: string | number) => {
        setFormData(prev => {
            const newSchedule = { ...prev.schedule };
            
            if (field === 'startTime') {
                newSchedule.startTime = value as string;
                newSchedule.endTime = calculateEndTime(value as string, newSchedule.bufferMinutes);
            } else if (field === 'bufferMinutes') {
                newSchedule.bufferMinutes = Number(value);
                newSchedule.endTime = calculateEndTime(newSchedule.startTime, Number(value));
            }

            return {
                ...prev,
                schedule: newSchedule
            };
        });
    };

    const addAlternativeDate = () => {
        if (formData.alternativeDates.length < 4) { // Max 5 dates including primary
            setFormData(prev => ({
                ...prev,
                alternativeDates: [
                    ...prev.alternativeDates,
                    {
                        date: '',
                        startTime: '09:00',
                        bufferMinutes: 15,
                        endTime: '09:15'
                    }
                ]
            }));
        }
    };

    const removeAlternativeDate = (index: number) => {
        setFormData(prev => ({
            ...prev,
            alternativeDates: prev.alternativeDates.filter((_, i) => i !== index)
        }));
    };

    const updateAlternativeDate = (index: number, field: keyof ScheduleOption, value: string | number) => {
        setFormData(prev => {
            const updatedDates = [...prev.alternativeDates];
            const currentDate = { ...updatedDates[index] };

            if (field === 'bufferMinutes') {
                currentDate[field] = Number(value);
            } else {
                currentDate[field as 'date' | 'startTime' | 'endTime'] = String(value);
            }

            updatedDates[index] = currentDate;
            return {
                ...prev,
                alternativeDates: updatedDates
            };
        });
    };

    const addAlternativeTime = () => {
        if (formData.alternativeTimes.length < 3) {
            setFormData(prev => ({
                ...prev,
                alternativeTimes: [
                    ...prev.alternativeTimes,
                    {
                        startTime: '09:00',
                        bufferMinutes: 15,
                        endTime: '09:15'
                    }
                ]
            }));
        }
    };

    const removeAlternativeTime = (index: number) => {
        setFormData(prev => ({
            ...prev,
            alternativeTimes: prev.alternativeTimes.filter((_, i) => i !== index)
        }));
    };

    const updateAlternativeTime = (index: number, field: 'startTime' | 'bufferMinutes', value: string | number) => {
        setFormData(prev => {
            const updatedTimes = [...prev.alternativeTimes];
            const currentTime = { ...updatedTimes[index] };

            if (field === 'startTime') {
                currentTime.startTime = value as string;
                currentTime.endTime = calculateEndTime(value as string, currentTime.bufferMinutes);
            } else if (field === 'bufferMinutes') {
                currentTime.bufferMinutes = Number(value);
                currentTime.endTime = calculateEndTime(currentTime.startTime, Number(value));
            }

            updatedTimes[index] = currentTime;
            return {
                ...prev,
                alternativeTimes: updatedTimes
            };
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Bookings
                </button>
                <h1 className="text-2xl font-bold">{id ? 'Edit Booking' : 'New Booking'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                    
                    {/* Contact Search */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search or Add Contact
                        </label>
                        <ContactSearch onSelect={handleContactSelect} />
                    </div>

                    {/* Show selected contact info */}
                    {selectedContact ? (
                        <div className="mb-4 p-6 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4 w-full">
                                    {/* Contact Basic Info */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {selectedContact.firstName} {selectedContact.lastName}
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleClearContact}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>

                                    {/* Contact Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Contact Details</div>
                                            <div className="mt-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-gray-400" />
                                                    <span>{selectedContact.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={16} className="text-gray-400" />
                                                    <span>{selectedContact.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="text-sm text-gray-500">Address</div>
                                            <div className="mt-1">
                                                <div className="flex items-start gap-2">
                                                    <MapPin size={16} className="text-gray-400 mt-1" />
                                                    <div>
                                                        <div className="text-gray-900">
                                                            {selectedContact.address.street}
                                                        </div>
                                                        <div className="text-gray-600">
                                                            {[
                                                                selectedContact.address.suburb,
                                                                selectedContact.address.city,
                                                                selectedContact.address.state,
                                                                selectedContact.address.postcode
                                                            ].filter(Boolean).join(', ')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    name="customer.name"
                                    value={formData.customer.name}
                                    onChange={(e) => handleInputChange(e)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="customer.email"
                                    value={formData.customer.email}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="customer.phone"
                                    value={formData.customer.phone}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Service Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Service Details</h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowCustomServiceModal(true)}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Custom Service
                            </button>
                        </div>
                    </div>

                    {/* Service Search and Add */}
                    <div className="flex gap-2 mb-4">
                        <div className="flex-1">
                            <select
                                value=""
                                onChange={(e) => {
                                    handleServiceSelect(e.target.value);
                                    e.target.value = ''; // Reset select after choosing
                                }}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">Add a Service</option>
                                {services.map((service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name} - ${service.basePrice} ({service.duration} hours)
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Selected Services List */}
                    <div className="space-y-4">
                        {formData.services.map((service, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
                                <button
                                    type="button"
                                    onClick={() => removeService(index)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                >
                                    <X size={16} />
                                </button>

                                <div className="grid gap-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium">{service.name}</h3>
                                        <div className="text-sm text-gray-500">
                                            {service.isCustom ? 'Custom Service' : 'Standard Service'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Duration</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={service.hours}
                                                    onChange={(e) => updateServiceField(index, 'hours', Number(e.target.value))}
                                                    min="0.5"
                                                    step="0.5"
                                                    className="w-20 border rounded px-2 py-1 text-right"
                                                />
                                                <span className="text-sm">hours</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Price</label>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm">$</span>
                                                <input
                                                    type="number"
                                                    value={service.amount}
                                                    onChange={(e) => updateServiceField(index, 'amount', Number(e.target.value))}
                                                    min="0"
                                                    step="0.01"
                                                    className="w-24 border rounded px-2 py-1 text-right"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">Extras</label>
                                            <button
                                                type="button"
                                                onClick={() => addServiceExtra(index)}
                                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                            >
                                                <Plus size={14} />
                                                Add Extra
                                            </button>
                                        </div>
                                    </div>

                                    {/* Service Extras */}
                                    {service.extras.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {service.extras.map((extra, extraIndex) => (
                                                <div 
                                                    key={`${index}-${extraIndex}`} 
                                                    className="flex items-center justify-between bg-white p-2 rounded border"
                                                >
                                                    <div className="flex-1 mr-2">
                                                        <input
                                                            type="text"
                                                            value={extra.name}
                                                            onChange={(e) => updateServiceExtra(index, extraIndex, 'name', e.target.value)}
                                                            placeholder="Extra name"
                                                            className="w-full border-none bg-transparent focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span>$</span>
                                                        <input
                                                            type="number"
                                                            value={extra.price}
                                                            onChange={(e) => updateServiceExtra(index, extraIndex, 'price', Number(e.target.value))}
                                                            className="w-20 border rounded px-2 py-1 text-right"
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeServiceExtra(index, extraIndex)}
                                                            className="text-gray-400 hover:text-red-500 ml-2"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">Total Amount:</span>
                            <span className="text-xl font-semibold">
                                ${formData.services.reduce((total, service) => {
                                    const extrasTotal = service.extras.reduce((sum, extra) => sum + extra.price, 0);
                                    return total + service.amount + extrasTotal;
                                }, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Schedule</h2>
                    <div className="space-y-6">
                        {/* Flexibility Options */}
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isFlexibleTime}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        isFlexibleTime: e.target.checked
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span>Flexible with time</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isFlexibleDate}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        isFlexibleDate: e.target.checked,
                                        alternativeDates: e.target.checked ? prev.alternativeDates : []
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span>Flexible with date</span>
                            </label>
                        </div>

                        {/* Primary Schedule */}
                        <div className="border-b pb-6">
                            <div className="text-sm font-medium text-gray-500 mb-4">Preferred Schedule</div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="schedule.date"
                                        value={formData.schedule.date}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            value={formData.schedule.startTime}
                                            onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Buffer Time</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={formData.schedule.bufferMinutes}
                                                onChange={(e) => handleScheduleChange('bufferMinutes', e.target.value)}
                                                min="0"
                                                max="60"
                                                step="5"
                                                className="w-20 border rounded-lg px-3 py-2"
                                            />
                                            <span className="text-gray-500">minutes</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">End Time</label>
                                        <input
                                            type="time"
                                            value={formData.schedule.endTime}
                                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-sm text-blue-800">
                                        <span className="font-medium">Arrival Window: </span>
                                        Cleaners will arrive between{' '}
                                        <span className="font-medium">
                                            {formData.schedule.startTime}
                                        </span>{' '}
                                        and{' '}
                                        <span className="font-medium">
                                            {formData.schedule.endTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Alternative Dates */}
                        {formData.isFlexibleDate && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-medium text-gray-500">Alternative Dates</div>
                                    {formData.alternativeDates.length < 4 && (
                                        <button
                                            type="button"
                                            onClick={addAlternativeDate}
                                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                        >
                                            <Plus size={14} />
                                            Add Alternative Date
                                        </button>
                                    )}
                                </div>

                                {formData.alternativeDates.map((altDate, index) => (
                                    <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                                        <button
                                            type="button"
                                            onClick={() => removeAlternativeDate(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                        >
                                            <X size={16} />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={altDate.date}
                                                    onChange={(e) => updateAlternativeDate(index, 'date', e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                    required={formData.isFlexibleDate}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Start Time</label>
                                                <input
                                                    type="time"
                                                    value={altDate.startTime}
                                                    onChange={(e) => updateAlternativeDate(index, 'startTime', e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                    required={formData.isFlexibleDate}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Buffer Time</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={altDate.bufferMinutes}
                                                        onChange={(e) => updateAlternativeDate(index, 'bufferMinutes', e.target.value)}
                                                        min="0"
                                                        max="60"
                                                        step="5"
                                                        className="w-20 border rounded-lg px-3 py-2"
                                                    />
                                                    <span className="text-gray-500">minutes</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 p-2 bg-blue-50 rounded">
                                            <div className="text-sm text-blue-800">
                                                Arrival between {altDate.startTime} and {altDate.endTime}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Alternative Times (when flexible with time is checked) */}
                        {formData.isFlexibleTime && (
                            <div className="space-y-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-medium text-gray-500">Alternative Times</div>
                                    {formData.alternativeTimes.length < 3 && (
                                        <button
                                            type="button"
                                            onClick={addAlternativeTime}
                                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                        >
                                            <Plus size={14} />
                                            Add Alternative Time
                                        </button>
                                    )}
                                </div>

                                {formData.alternativeTimes.map((altTime, index) => (
                                    <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                                        <button
                                            type="button"
                                            onClick={() => removeAlternativeTime(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                        >
                                            <X size={16} />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Start Time</label>
                                                <input
                                                    type="time"
                                                    value={altTime.startTime}
                                                    onChange={(e) => updateAlternativeTime(index, 'startTime', e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                    required={formData.isFlexibleTime}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Buffer Time</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={altTime.bufferMinutes}
                                                        onChange={(e) => updateAlternativeTime(index, 'bufferMinutes', e.target.value)}
                                                        min="0"
                                                        max="60"
                                                        step="5"
                                                        className="w-20 border rounded-lg px-3 py-2"
                                                    />
                                                    <span className="text-gray-500">minutes</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 p-2 bg-blue-50 rounded">
                                            <div className="text-sm text-blue-800">
                                                Arrival between {altTime.startTime} and {altTime.endTime}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Service Address</h2>
                        {selectedContact && (
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    address: {
                                        street: selectedContact.address?.street || '',
                                        suburb: selectedContact.address?.suburb || '',
                                        city: selectedContact.address?.city || '',
                                        state: selectedContact.address?.state || '',
                                        postcode: selectedContact.address?.postcode || ''
                                    }
                                }))}
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                <ArrowDownToLine size={14} />
                                Reset to Contact Address
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Street Address</label>
                            <input
                                type="text"
                                name="address.street"
                                value={formData.address.street}
                                onChange={(e) => handleInputChange(e)}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder={selectedContact?.address?.street || 'Enter street address'}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Suburb</label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={formData.address.city}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder={selectedContact?.address?.city || 'Enter suburb'}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <select
                                    name="address.state"
                                    value={formData.address.state}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                >
                                    <option value="">Select State</option>
                                    <option value="NSW">NSW</option>
                                    <option value="VIC">VIC</option>
                                    <option value="QLD">QLD</option>
                                    <option value="WA">WA</option>
                                    <option value="SA">SA</option>
                                    <option value="TAS">TAS</option>
                                    <option value="ACT">ACT</option>
                                    <option value="NT">NT</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Postcode</label>
                                <input
                                    type="text"
                                    name="address.postcode"
                                    value={formData.address.postcode}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder={selectedContact?.address?.postcode || 'Enter postcode'}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Show a note if address differs from contact */}
                    {selectedContact && (
                        formData.address.street !== selectedContact.address?.street ||
                        formData.address.suburb !== selectedContact.address?.suburb ||
                        formData.address.city !== selectedContact.address?.city ||
                        formData.address.state !== selectedContact.address?.state ||
                        formData.address.postcode !== selectedContact.address?.postcode
                    ) && (
                        <div className="mt-3 text-sm text-blue-600 flex items-center gap-1">
                            <Info size={14} />
                            <span>Service address differs from contact address</span>
                        </div>
                    )}
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <h2 className="text-lg font-semibold">Property Details</h2>

                    {/* Pets Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="font-medium">Pets on Premises</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.propertyDetails.pets.present}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            pets: {
                                                ...prev.propertyDetails.pets,
                                                present: e.target.checked
                                            }
                                        }
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Yes, pets will be present</span>
                            </div>
                        </div>
                        {formData.propertyDetails.pets.present && (
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Pet Details</label>
                                <input
                                    type="text"
                                    value={formData.propertyDetails.pets.details}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            pets: {
                                                ...prev.propertyDetails.pets,
                                                details: e.target.value
                                            }
                                        }
                                    }))}
                                    placeholder="Type and number of pets, any special instructions"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        )}
                    </div>

                    {/* Equipment Section */}
                    <div className="space-y-3">
                        <label className="font-medium">Equipment Provided</label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.propertyDetails.equipment.clientProvided}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            equipment: {
                                                ...prev.propertyDetails.equipment,
                                                clientProvided: e.target.checked
                                            }
                                        }
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Client will provide cleaning supplies</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.propertyDetails.equipment.companyProvided}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            equipment: {
                                                ...prev.propertyDetails.equipment,
                                                companyProvided: e.target.checked
                                            }
                                        }
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Company will provide cleaning supplies</span>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Equipment Details</label>
                                <input
                                    type="text"
                                    value={formData.propertyDetails.equipment.details}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            equipment: {
                                                ...prev.propertyDetails.equipment,
                                                details: e.target.value
                                            }
                                        }
                                    }))}
                                    placeholder="Specify any equipment details or requirements"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Parking Section */}
                    <div className="space-y-3">
                        <label className="font-medium">Parking Information</label>
                        <div className="space-y-3">
                            <select
                                value={formData.propertyDetails.parking.type}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    propertyDetails: {
                                        ...prev.propertyDetails,
                                        parking: {
                                            ...prev.propertyDetails.parking,
                                            type: e.target.value as typeof formData.propertyDetails.parking.type
                                        }
                                    }
                                }))}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">Select Parking Type</option>
                                <option value="onsite">On-site Parking Available</option>
                                <option value="street">Street Parking Only</option>
                                <option value="none">No Parking Available</option>
                            </select>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Parking Instructions</label>
                                <textarea
                                    value={formData.propertyDetails.parking.instructions}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        propertyDetails: {
                                            ...prev.propertyDetails,
                                            parking: {
                                                ...prev.propertyDetails.parking,
                                                instructions: e.target.value
                                            }
                                        }
                                    }))}
                                    placeholder="Specific parking instructions, reimbursement details, etc."
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Frequency Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Frequency of Cleaning</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.frequency.isRecurring}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        frequency: {
                                            ...prev.frequency,
                                            isRecurring: e.target.checked,
                                            times: e.target.checked ? prev.frequency.times : 1,
                                            period: e.target.checked ? prev.frequency.period : ''
                                        }
                                    }))}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Recurring Service</span>
                            </div>
                        </div>

                        {formData.frequency.isRecurring && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="52"
                                        value={formData.frequency.times}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            frequency: {
                                                ...prev.frequency,
                                                times: Number(e.target.value)
                                            }
                                        }))}
                                        className="w-20 border rounded-lg px-3 py-2"
                                    />
                                    <span className="text-gray-600">times</span>
                                </div>

                                <select
                                    value={formData.frequency.period}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        frequency: {
                                            ...prev.frequency,
                                            period: e.target.value as typeof formData.frequency.period
                                        }
                                    }))}
                                    className="border rounded-lg px-3 py-2"
                                    required={formData.frequency.isRecurring}
                                >
                                    <option value="">Select Frequency</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="fortnightly">Fortnightly</option>
                                    <option value="3weekly">3 Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Options</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Payment Method</label>
                            <div className="flex gap-4">
                                {[
                                    { value: 'bank', label: 'Bank Transfer' },
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'card', label: 'Card Tap' }
                                ].map(method => (
                                    <label key={method.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.value}
                                            checked={formData.payment.method === method.value}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                payment: {
                                                    ...prev.payment,
                                                    method: e.target.value as typeof formData.payment.method
                                                }
                                            }))}
                                            className="rounded-full border-gray-300"
                                        />
                                        <span className="text-sm text-gray-600">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Payment Timing</label>
                            <div className="flex gap-4">
                                {[
                                    { value: 'onDay', label: 'Pay on Cleaning Day' },
                                    { value: 'now', label: 'Pay Now' },
                                    { value: 'partial', label: 'Partial Payment' }
                                ].map(timing => (
                                    <label key={timing.value} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="paymentTiming"
                                            value={timing.value}
                                            checked={formData.payment.timing === timing.value}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                payment: {
                                                    ...prev.payment,
                                                    timing: e.target.value as typeof formData.payment.timing
                                                }
                                            }))}
                                            className="rounded-full border-gray-300"
                                        />
                                        <span className="text-sm text-gray-600">{timing.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {formData.payment.timing === 'partial' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Partial Payment Amount</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={formData.payment.partialAmount || ''}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            payment: {
                                                ...prev.payment,
                                                partialAmount: Number(e.target.value)
                                            }
                                        }))}
                                        min="0"
                                        step="0.01"
                                        className="w-32 border rounded-lg px-3 py-2"
                                        required={formData.payment.timing === 'partial'}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Payment Notes</label>
                            <textarea
                                value={formData.payment.notes}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    payment: {
                                        ...prev.payment,
                                        notes: e.target.value
                                    }
                                }))}
                                placeholder="Add any payment-related notes or instructions..."
                                className="w-full border rounded-lg px-3 py-2"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange(e)}
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Add any special instructions or notes..."
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save size={20} />
                        {saving ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update Booking' : 'Create Booking')}
                    </button>
                </div>
            </form>

            {/* Custom Service Modal */}
            {showCustomServiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Add Custom Service</h3>
                        <form onSubmit={handleAddCustomService} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Name</label>
                                <input
                                    name="serviceName"
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Duration (hours)</label>
                                    <input
                                        name="duration"
                                        type="number"
                                        min="0.5"
                                        step="0.5"
                                        className="w-full border rounded-lg px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price ($)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full border rounded-lg px-3 py-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCustomServiceModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

