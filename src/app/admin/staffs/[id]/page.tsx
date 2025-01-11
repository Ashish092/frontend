import StaffProfileClient from '@/components/staff/StaffProfileClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    return <StaffProfileClient id={resolvedParams.id} />;
} 