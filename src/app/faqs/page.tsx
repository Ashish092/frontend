'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/api'

interface FAQ {
    _id: string
    question: string
    answer: string
    category: string
}

const categories = ['All', 'Services', 'Booking', 'Products', 'Safety', 'Pricing']

export default function FAQsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [openFaq, setOpenFaq] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/faqs`)
                setFaqs(response.data)
            } catch (err) {
                setError('Failed to fetch FAQs')
                console.error('Error fetching FAQs:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchFaqs()
    }, [])

    const filteredFAQs = faqs.filter((faq) => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">Loading FAQs...</div>
            </div>
        </MainLayout>
    )

    if (error) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        </MainLayout>
    )

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our cleaning services, booking process, and more.
                    </p>
                </div>

                {/* Search and Categories */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            className="w-full p-4 pr-12 border rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-4 top-4 text-gray-400" size={24} />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full ${
                                    selectedCategory === category
                                        ? 'bg-[#1E3D8F] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {filteredFAQs.map((faq) => (
                            <div
                                key={faq._id}
                                className="border rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === faq._id ? null : faq._id)}
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform duration-200 ${
                                            openFaq === faq._id ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out ${
                                        openFaq === faq._id
                                            ? 'max-h-[1000px] opacity-100'
                                            : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                                >
                                    <div className="p-4 bg-gray-50 border-t transform transition-transform duration-500 ease-out">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
} 