'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ServiceData {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    // ... rest of your service interface
}

interface EditServiceClientProps {
    id: string;
}

export default function EditServiceClient({ id }: EditServiceClientProps) {
    const [service, setService] = useState<ServiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `http://localhost:5000/api/services/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setService(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch service:', error);
                toast.error('Failed to fetch service details');
                router.push('/admin/services');
            }
        };

        fetchService();
    }, [id, router]);

    if (loading) return <div>Loading...</div>;
    if (!service) return <div>Service not found</div>;

    return (
        <div className="p-6">
            {/* Add your service edit form here */}
            <h1>Edit Service</h1>
            {/* Your form implementation */}
        </div>
    );
} 