import { use } from 'react';
import StaffForm from '@/components/staff/StaffForm';

export default function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    return <StaffForm id={resolvedParams.id} />;
} 