import EditContactClient from './EditContactClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    return (
        <EditContactClient 
            id={resolvedParams.id} 
        />
    );
} 