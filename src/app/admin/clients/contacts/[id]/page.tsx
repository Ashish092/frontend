import { use } from 'react';
import ContactProfileClient from '@/components/contacts/ContactProfileClient';

export default function ContactPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    return <ContactProfileClient id={resolvedParams.id} />;
} 