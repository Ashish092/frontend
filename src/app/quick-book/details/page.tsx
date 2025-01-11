import BookingHeader from '@/components/layout/BookingHeader';
import Sidebar from '@/components/layout/Sidebar';
import BookingSummary from '@/components/layout/BookingSummary';
import BookingDetails from '@/components/features/BookingDetails';
import BookingProgress from '@/components/features/BookingProgress';

export default function QuickBookDetailsPage() {
    return (
        <>
            <BookingHeader />
            <Sidebar />
            
            <main className="flex-1 min-h-screen pt-24 px-4 md:pl-64 md:pr-80">
                <div className="p-6">
                    <BookingProgress />
                    <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
                    <BookingDetails />
                </div>
            </main>
            
            <BookingSummary />
        </>
    );
} 