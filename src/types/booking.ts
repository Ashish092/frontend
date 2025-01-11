export interface BookingFormData {
  _id?: string;
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
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
    bufferMinutes: number;
  };
  services: Array<{
    serviceId: string;
    name: string;
    hours: number;
    amount: number;
    extras: Array<{
      name: string;
      price: number;
    }>;
    isCustom?: boolean;
  }>;
  status: string;
  notes: string;
  tags: string[];
  isFlexibleTime: boolean;
  isFlexibleDate: boolean;
  alternativeDates: Array<{
    date: string;
    startTime: string;
    bufferMinutes: number;
    endTime: string;
  }>;
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
  payment: {
    method: 'bank' | 'cash' | 'card' | '';
    timing: 'onDay' | 'now' | 'partial';
    partialAmount?: number;
    notes: string;
  };
  frequency: {
    isRecurring: boolean;
    times: number;
    period: 'weekly' | 'fortnightly' | '3weekly' | 'monthly' | '';
  };
} 