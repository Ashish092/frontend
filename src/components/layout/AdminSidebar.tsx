'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
    LayoutDashboard,    
    Calendar,
    Users,
    Settings,    
    Menu,
    X,
    Globe,    
    Bell,
    ChevronDown,    
    BookOpen,    
    MessageSquare,
    LucideIcon
} from 'lucide-react';

interface NavItem {
    label: string;
    href?: string;
    icon?: LucideIcon;
    subItems?: NavItem[];
}

export default function AdminSidebar({ 
    isSidebarOpen, 
    setIsSidebarOpen 
}: { 
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}) {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const navItems: NavItem[] = [
        { 
            label: 'Dashboard', 
            href: '/admin', 
            icon: LayoutDashboard 
        },
        {
            label: 'Bookings',
            icon: BookOpen,
            subItems: [
                { label: 'Online Bookings', href: '/admin/bookings/online' },
                { label: 'Manual Bookings', href: '/admin/bookings/manual' },
                { label: 'Quotes', href: '/admin/bookings/quotes' },
                { label: 'Drafts', href: '/admin/bookings/drafts' },
                { label: 'Cost Calculator', href: '/admin/bookings/calculator' }
            ]
        },
        { 
            label: 'Clients', 
            icon: Users,
            subItems: [
                { label: 'All Clients', href: '/admin/clients' },
                { label: 'Contacts', href: '/admin/clients/contacts' },
                { label: 'Subscription', href: '/admin/clients/subscription' }
            ]
        },
        {
            label: 'Messages',
            icon: MessageSquare,
            subItems: [
                { label: 'Contact Us', href: '/admin/messages/contact' },
                { label: 'Enquiries', href: '/admin/messages/enquiries' },
                { label: 'Email', href: '/admin/messages/email' },
                { label: 'Inbox', href: '/admin/messages/inbox' }
            ]
        },
        {
            label: 'Website',
            icon: Globe,
            subItems: [
                { label: 'Services', href: '/admin/website/services' },
                { label: 'Pricing', href: '/admin/website/pricing' },
                { label: 'Blog', href: '/admin/website/blog' },
                { label: 'FAQs', href: '/admin/faqs' },
                { label: 'Career', href: '/admin/website/career' }
            ]
        },
        { 
            label: 'Staffs',
            icon: Users,
            subItems: [
                { label: 'All Staff', href: '/admin/staffs' },
                { label: 'Departments', href: '/admin/staffs/departments' }
            ]
        },
        {
            label: 'Calendar',
            icon: Calendar,
            subItems: [
                { label: 'Staff Availability', href: '/admin/calendar/availability' },
                { label: 'Booking Calendar', href: '/admin/calendar/bookings' }
            ]
        },
        { 
            label: 'Settings', 
            href: '/admin/settings', 
            icon: Settings 
        }
    ];

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <Image
                            src="/images/logo.webp"
                            alt="Logo"
                            width={150}
                            height={40}
                            className="hidden lg:block"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full" />
                            <span className="hidden lg:block">Admin</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`
                fixed top-[57px] left-0 z-40 h-[calc(100vh-57px)] transition-transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 w-64 bg-white shadow-lg
            `}>
                <nav className="h-full overflow-y-auto py-4">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            {item.subItems ? (
                                // Menu with submenu
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={`
                                            w-full flex items-center justify-between px-4 py-2
                                            hover:bg-gray-50 transition-colors
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon && <item.icon size={20} />}
                                            {item.label}
                                        </div>
                                        <ChevronDown
                                            size={16}
                                            className={`transform transition-transform ${
                                                openSubmenu === item.label ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    {openSubmenu === item.label && (
                                        <div className="bg-gray-50 pl-12 py-2">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href || '#'}
                                                    className={`
                                                        block py-2 px-4 text-sm
                                                        ${pathname === subItem.href 
                                                            ? 'text-blue-600' 
                                                            : 'text-gray-600 hover:text-gray-900'
                                                        }
                                                    `}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Regular menu item
                                <Link
                                    href={item.href || '#'}
                                    className={`
                                        flex items-center gap-3 px-4 py-2
                                        ${pathname === item.href 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    {item.icon && <item.icon size={20} />}
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
} 