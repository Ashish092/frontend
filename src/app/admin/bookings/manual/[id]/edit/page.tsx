import EditBookingClient from './EditBookingClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    return (
        <EditBookingClient 
            id={resolvedParams.id} 
        />
    );
}

// Remove metadata for now to simplify the issue 