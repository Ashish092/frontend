'use client'

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Blog {
    title: string;
    content: string;
    coverImage: string;
    category: string;
    author: string;
    createdAt: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${params.slug}`);
                setBlog(response.data);
            } catch (err: unknown) {
                const error = err as AxiosError<{ message: string }>;
                console.error('Error fetching blog:', error);
                setError(error.response?.data?.message || 'Failed to fetch blog post');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchBlog();
        }
    }, [params.slug]);

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        </MainLayout>
    );

    if (error || !blog) return (
        <MainLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error || 'Blog post not found'}</div>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <article className="container mx-auto px-4 py-12 mt-32">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <span className="text-blue-600">{blog.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{blog.title}</h1>
                        <div className="flex items-center text-gray-600">
                            <span>{blog.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="relative h-[400px] mb-8">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={createMarkup(blog.content)}
                    />
                </div>
            </article>
        </MainLayout>
    );
} 