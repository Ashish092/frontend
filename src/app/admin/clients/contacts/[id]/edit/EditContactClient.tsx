'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ContactForm from '@/components/contacts/ContactForm';

interface ContactData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
}

interface EditContactClientProps {
    id: string;
}

export default function EditContactClient({ id }: EditContactClientProps) {
    const [contact, setContact] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `http://localhost:5000/api/contacts/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setContact(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch contact:', error);
                toast.error('Failed to fetch contact details');
                router.push('/admin/clients/contacts');
            }
        };

        fetchContact();
    }, [id, router]);

    if (loading) return <div>Loading...</div>;
    if (!contact) return <div>Contact not found</div>;

    return <ContactForm id={id} initialData={contact} />;
} 