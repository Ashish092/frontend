'use client';

import BookingHeader from '@/components/layout/BookingHeader';
import Sidebar from '@/components/layout/Sidebar';
import BookingSummary from '@/components/layout/BookingSummary';
import LocationSearch from '@/components/features/LocationSearch';
import BookingProgress from '@/components/features/BookingProgress';

export default function QuickBookPage() {
    return (
        <>
            <BookingHeader />
            <Sidebar />
            
            <main className="flex-1 min-h-screen pt-24 px-4 md:pl-64 md:pr-80">
                <div className="p-6">
                    <BookingProgress />
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">Quick Book Service</h1>
                        <LocationSearch />
                    </div>
                </div>
            </main>
            
            <BookingSummary />
        </>
    );
} 