export interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        suburb: string;
        city: string;
        state: string;
        postcode: string;
    };
    avatar?: string;
} 