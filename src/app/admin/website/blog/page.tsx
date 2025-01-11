'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { 
    Pencil, 
    Trash2, 
    Plus, 
    X
} from 'lucide-react';
import Image from 'next/image';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    category: string;
    author: string;
    isPublished: boolean;
    createdAt?: string;
}

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952', // Default image
        category: 'Cleaning Tips',
        author: '',
        isPublished: true
    });
    const [showPreview, setShowPreview] = useState(false);

    const categories = ['Cleaning Tips', 'Home Maintenance', 'Commercial Cleaning', 'Green Cleaning', 'Other'];

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:5000/api/blogs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBlogs(response.data);
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Failed to fetch blogs');
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertGoogleDriveLink = (url: string) => {
        try {
            const fileIdMatch = url.match(/\/d\/(.+?)\/|id=(.+?)&/);
            if (fileIdMatch) {
                const fileId = fileIdMatch[1] || fileIdMatch[2];
                return `https://drive.google.com/uc?export=view&id=${fileId}`;
            }
            return url;
        } catch (error) {
            console.error('Error converting Google Drive link:', error);
            return url;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const submissionData = {
                ...formData,
                coverImage: convertGoogleDriveLink(formData.coverImage)
            };

            if (editingId) {
                await axios.put(`http://localhost:5000/api/blogs/${editingId}`, submissionData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/blogs', submissionData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchBlogs();
            resetForm();
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Failed to save blog');
            console.error('Failed to save blog:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBlogs();
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Failed to delete blog');
            console.error('Failed to delete blog:', error);
        }
    };

    const handleEdit = (blog: Blog) => {
        setEditingId(blog._id);
        setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            coverImage: blog.coverImage,
            category: blog.category,
            author: blog.author,
            isPublished: blog.isPublished
        });
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952', // Default image
            category: 'Cleaning Tips',
            author: '',
            isPublished: true
        });
        setEditingId(null);
        setShowAddForm(false);
    };

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Blog Management</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        showAddForm 
                            ? 'bg-gray-500 hover:bg-gray-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-colors`}
                >
                    {showAddForm ? <X size={20} /> : <Plus size={20} />}
                    {showAddForm ? 'Cancel' : 'Add New Blog'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showAddForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={2}
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="font-medium">Content (HTML supported)</label>
                                <button
                                    type="button"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="text-sm text-blue-500 hover:text-blue-600"
                                >
                                    {showPreview ? 'Show Editor' : 'Show Preview'}
                                </button>
                            </div>
                            
                            {showPreview ? (
                                <div 
                                    className="prose prose-blue max-w-none p-4 border rounded min-h-[200px] bg-gray-50"
                                    dangerouslySetInnerHTML={createMarkup(formData.content)}
                                />
                            ) : (
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({...formData, content: e.target.value})}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                                    rows={15}
                                    placeholder="<h2>Your content here...</h2>
<p>You can use HTML tags to style your content:</p>
<ul>
    <li>Use <strong>bold</strong> text</li>
    <li>Add <a href='#'>links</a></li>
    <li>Create lists</li>
</ul>"
                                    required
                                />
                            )}
                            
                            <div className="mt-2 text-sm text-gray-500">
                                Tip: Use HTML tags to style your content. Examples:
                                <code className="ml-2 text-xs bg-gray-100 p-1 rounded">
                                    &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a href=&quot;&quot;&gt;
                                </code>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Cover Image URL</label>
                            <input
                                type="url"
                                value={formData.coverImage}
                                onChange={e => setFormData({...formData, coverImage: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={e => setFormData({...formData, author: e.target.value})}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.isPublished}
                                onChange={e => setFormData({...formData, isPublished: e.target.checked})}
                                id="isPublished"
                                className="rounded text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="isPublished">Publish immediately</label>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                            >
                                {editingId ? 'Update Blog' : 'Create Blog'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{blog.title}</h3>
                                    <p className="text-sm text-gray-500">{blog.category}</p>
                                    <p className="text-sm text-gray-500">By {blog.author}</p>
                                    {blog.createdAt && (
                                        <p className="text-sm text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                    title="Edit"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 