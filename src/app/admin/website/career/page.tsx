'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { 
    Pencil, 
    Trash2, 
    X,     
    Loader2
} from 'lucide-react';

interface Career {
    _id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    department: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    isActive: boolean;
}

type ArrayField = 'requirements' | 'responsibilities' | 'benefits';

interface CareerFormData {
    title: string;
    location: string;
    type: string;
    salary: string;
    department: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    isActive: boolean;
}

export default function AdminCareersPage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<CareerFormData>({
        title: '',
        location: '',
        type: 'Full-time',
        salary: '',
        department: 'Operations',
        description: '',
        requirements: [''],
        responsibilities: [''],
        benefits: [''],
        isActive: true
    });

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Casual'];
    const departments = ['Operations', 'Cleaner', 'Management', 'Administration', 'Sales'];

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:5000/api/careers/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCareers(response.data);
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Error fetching careers:', error);
            setError(error.response?.data?.message || 'Failed to fetch careers');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/careers/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/careers', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchCareers();
            resetForm();
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Failed to save career');
            console.error('Failed to save career:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this career posting?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/api/careers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCareers();
            setError(null);
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Failed to delete career');
            console.error('Failed to delete career:', error);
        }
    };

    const handleEdit = (career: Career) => {
        setEditingId(career._id);
        setFormData({
            title: career.title,
            location: career.location,
            type: career.type,
            salary: career.salary,
            department: career.department,
            description: career.description,
            requirements: career.requirements,
            responsibilities: career.responsibilities,
            benefits: career.benefits,
            isActive: career.isActive
        });
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            location: '',
            type: 'Full-time',
            salary: '',
            department: 'Operations',
            description: '',
            requirements: [''],
            responsibilities: [''],
            benefits: [''],
            isActive: true
        });
        setEditingId(null);
        setShowAddForm(false);
    };

    const handleArrayInput = (
        field: ArrayField,
        index: number,
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field: ArrayField) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field: ArrayField, index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const arrayFields: ArrayField[] = ['requirements', 'responsibilities', 'benefits'];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Careers</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showAddForm ? 'Cancel' : 'Add New Career'}
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
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Salary</label>
                                <input
                                    type="text"
                                    value={formData.salary}
                                    onChange={e => setFormData({...formData, salary: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={e => setFormData({...formData, type: e.target.value})}
                                    className="w-full p-2 border rounded"
                                >
                                    {jobTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Department</label>
                                <select
                                    value={formData.department}
                                    onChange={e => setFormData({...formData, department: e.target.value})}
                                    className="w-full p-2 border rounded"
                                >
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                className="w-full p-2 border rounded"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Dynamic Arrays */}
                        {arrayFields.map((field) => (
                            <div key={field} className="space-y-2">
                                <label className="block font-medium capitalize">
                                    {field}
                                </label>
                                {formData[field].map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleArrayInput(field, index, e.target.value)}
                                            className="flex-1 p-2 border rounded"
                                            placeholder={`Add ${field.slice(0, -1)}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(field, index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem(field)}
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                >
                                    + Add {field.slice(0, -1)}
                                </button>
                            </div>
                        ))}

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                                id="isActive"
                            />
                            <label htmlFor="isActive">Active listing</label>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                {editingId ? 'Update Career' : 'Create Career'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8">
                        <Loader2 className="animate-spin mx-auto" size={32} />
                    </div>
                ) : careers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No careers found
                    </div>
                ) : (
                    careers.map((career) => (
                        <div key={career._id} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                                    <p className="text-gray-600 mb-2">{career.location}</p>
                                    <div className="flex gap-2 text-sm">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {career.type}
                                        </span>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                            {career.department}
                                        </span>
                                        {!career.isActive && (
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(career)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(career._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 