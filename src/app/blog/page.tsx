'use client'

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { API_URL } from '@/config/api';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: string;
    author: string;
    createdAt: string;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Cleaning Tips', 'Home Maintenance', 'Commercial Cleaning', 'Green Cleaning'];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/blogs`);
                console.log('Blogs response:', response.data);
                setBlogs(response.data);
            } catch (err: unknown) {
                const error = err as AxiosError<{ message: string }>;
                console.error('Error fetching blogs:', error);
                setError(error.response?.data?.message || 'Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        </MainLayout>
    );

    if (error) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest cleaning tips, industry news, and professional advice.
                    </p>
                </div>

                {/* Search and Categories */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search blogs..."
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

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredBlogs.map((blog) => (
                        <Link 
                            href={`/blog/${blog.slug}`} 
                            key={blog._id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-blue-600 mb-2">{blog.category}</div>
                                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{blog.author}</span>
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
} 