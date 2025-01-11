import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientToaster from "@/components/ClientToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Cleaning Services",
  description: "Book professional cleaning services for your home or office",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          {children}
        </div>
        <ClientToaster />
      </body>
    </html>
  );
}
