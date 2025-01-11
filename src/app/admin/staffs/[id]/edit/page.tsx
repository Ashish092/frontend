import StaffForm from '@/components/staff/StaffForm';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    return <StaffForm id={resolvedParams.id} />;
} 