'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthStatus } from '@/services/authService';
import { Loader2 } from 'lucide-react';

export default function AdminAuthMiddleware({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    router.push('/admin/login');
                    return;
                }

                const isValid = await checkAuthStatus();
                if (!isValid) {
                    router.push('/admin/login');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Auth verification failed:', error);
                router.push('/admin/login');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return isAuthorized ? children : null;
} 