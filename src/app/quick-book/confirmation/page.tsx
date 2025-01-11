import BookingHeader from '@/components/layout/BookingHeader';
import Sidebar from '@/components/layout/Sidebar';
import BookingConfirmation from '@/components/features/BookingConfirmation';
import BookingSummary from '@/components/layout/BookingSummary';

export default function QuickBookConfirmationPage() {
    return (
        <>
            <BookingHeader />
            <Sidebar />
            
            <main className="flex-1 min-h-screen pt-24 px-4 md:pl-64 md:pr-80">
                <div className="p-6 max-w-4xl mx-auto">
                    <BookingConfirmation />
                </div>
            </main>
            
            <BookingSummary />
        </>
    );
} 