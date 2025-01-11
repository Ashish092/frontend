'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import { Search, Plus, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import { Contact } from '@/types/contact';
import Image from 'next/image';

interface ContactSearchProps {
    onSelect: (contact: Contact) => void;
}

export default function ContactSearch({ onSelect }: ContactSearchProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // First, create a stable search function
    const performSearch = useCallback(async (term: string) => {
        if (!term) {
            setContacts([]);
            return;
        }

        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(
                `http://localhost:5000/api/contacts/search?q=${term}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (response.data.success) {
                setContacts(response.data.data);
                setShowDropdown(true);
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            console.error('Failed to search contacts:', error);
            setError('Failed to search contacts');
            setContacts([]);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array since we're using function closures

    // Then, create the debounced version using useMemo instead of useCallback
    const debouncedSearch = useMemo(
        () => debounce((term: string) => {
            performSearch(term);
        }, 300),
        [performSearch]
    );

    // Clean up the debounced function
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // Use the debounced search
    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (contact: Contact) => {
        onSelect(contact);
        setSearchTerm('');
        setShowDropdown(false);
        setError('');
    };

    return (
        <div className="relative">
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border rounded-lg"
                        onFocus={() => setShowDropdown(true)}
                    />
                    {loading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => router.push('/admin/clients/contacts/new')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus size={20} />
                    New Contact
                </button>
            </div>

            {error && (
                <div className="mt-1 text-sm text-red-600">
                    {error}
                </div>
            )}

            {showDropdown && (
                <div 
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto"
                >
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <div
                                key={contact._id}
                                className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                                onClick={() => handleSelect(contact)}
                            >
                                {contact.avatar ? (
                                    <Image 
                                        src={contact.avatar}
                                        alt={`${contact.firstName} ${contact.lastName}`}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User size={16} className="text-gray-500" />
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                                    <div className="text-sm text-gray-500">{contact.phone}</div>
                                </div>
                            </div>
                        ))
                    ) : searchTerm ? (
                        <div className="p-3 text-center text-gray-500">
                            No contacts found
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
} 