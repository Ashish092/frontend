import { use } from 'react';
import StaffProfileClient from '@/components/staff/StaffProfileClient';

export default function StaffPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    return <StaffProfileClient id={resolvedParams.id} />;
} 