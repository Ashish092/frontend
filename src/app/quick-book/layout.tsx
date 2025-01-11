import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quick Book Cleaning Service",
    description: "Quickly book your professional cleaning service",
};

export default function QuickBookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            {children}
        </div>
    );
} 