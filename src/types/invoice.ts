export interface Invoice {
    _id: string;
    invoiceNo: string;
    bookingId: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: {
            street: string;
            suburb: string;
            state: string;
            postcode: string;
        }
    };
    service: {
        description: string;
        hours: number;
        rate: number;
        amount: number;
        extras: Array<{
            name: string;
            amount: number;
        }>;
    };
    subtotal: number;
    gst: number;
    total: number;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
    dueDate: string;
    createdAt: string;
    paidAt?: string;
} 