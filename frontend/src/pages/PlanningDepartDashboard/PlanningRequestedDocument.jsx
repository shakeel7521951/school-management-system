import React, { useState, useEffect } from 'react'
import { Bell, PlusCircle, FileText, Edit, Trash2, Eye, Download, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PlanningRequestedDocument = () => {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [timer, setTimer] = useState({}); // for countdown

    useEffect(() => {
        fetchForms();
    }, []);

    // Update countdown every second
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimer = {};
            forms.forEach(form => {
                updatedTimer[form._id] = getRemainingTime(form.createdAt, form.fillDuration);
            });
            setTimer(updatedTimer);
        }, 1000);

        return () => clearInterval(interval);
    }, [forms]);

    const fetchForms = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/getForms`, { withCredentials: true });
            setForms(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.error("Error fetching forms:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteForm = async (id) => {
        try {
            await axios.delete(`${BACKEND_URL}/delete-form/${id}`, { withCredentials: true });
            setForms(forms.filter(form => form._id !== id));
            setDeleteConfirm(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.error("Error deleting form:", err);
        }
    };

    const handleDownloadHTML = (form) => {
        const blob = new Blob([form.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${form.title.replace(/\s+/g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePrintForm = (form) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(form.html);
        printWindow.document.close();
        printWindow.onload = function () {
            printWindow.focus();
            printWindow.print();
        };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    // Function to calculate remaining time
    const getRemainingTime = (createdAt, fillDuration) => {
        const createdTime = new Date(createdAt).getTime();
        const now = Date.now();
        const endTime = createdTime + fillDuration * 24 * 60 * 60 * 1000;
        const remaining = endTime - now;

        if (remaining <= 0) return "Expired";

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    if (loading) {
        return (
            <div className="p-6 md:ml-20 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104c80]"></div>
                        <p className="mt-4 text-gray-600">Loading forms...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans'>
            <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
                {/* Header */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                    <h2 className='text-3xl font-bold text-[#104c80] flex items-center gap-2'>
                        <FileText className='w-7 h-7 text-[#104c80]' />
                        Form Management
                    </h2>
                    <button
                        onClick={() => navigate("/form-editor")}
                        className='flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition'
                    >
                        <PlusCircle className='w-5 h-5' /> Create New Form
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                        <p>Error: {error}</p>
                        <button
                            onClick={fetchForms}
                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {forms.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600">No forms found</h3>
                        <p className="text-gray-500 mt-2">Create your first form to get started.</p>
                        <button
                            onClick={() => navigate("/form-editor")}
                            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition mx-auto"
                        >
                            <PlusCircle className='w-5 h-5' /> Create New Form
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Table for md+ screens */}
                        <div className='hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-200'>
                            <table className='min-w-full border-collapse'>
                                <thead>
                                    <tr className='bg-[#104c80] text-white text-sm uppercase tracking-wide shadow-sm'>
                                        <th className='px-6 py-4 text-left rounded-tl-xl'>Title</th>
                                        <th className='px-6 py-4 text-left'>Created</th>
                                        <th className='px-6 py-4 text-left'>Time left</th>
                                        <th className='px-6 py-4 text-left'>Status</th>
                                        <th className='px-6 py-4 text-left rounded-tr-xl'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forms.map((form, i) => (
                                        <tr
                                            key={form._id}
                                            className={`transition ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/60`}
                                        >
                                            <td className='px-6 py-4 text-gray-800 font-semibold'>{form.title}</td>
                                            <td className='px-6 py-4 text-gray-700'>{formatDate(form.createdAt)}</td>
                                            <td className='px-6 py-4 text-gray-700'>{timer[form._id]}</td>
                                            <td className='px-6 py-4'>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {form.isPublished ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => navigate(`/view/${form._id}`)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition" title="View">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => navigate(`/form-editor/${form._id}`)} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition" title="Edit">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDownloadHTML(form)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition" title="Download">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handlePrintForm(form)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition" title="Print">
                                                        <Printer className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => setDeleteConfirm(form._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cards for mobile */}
                        <div className='block md:hidden space-y-4'>
                            {forms.map((form) => (
                                <div key={form._id} className='bg-white rounded-xl shadow p-4 border border-gray-200'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <h3 className='font-semibold text-gray-800 flex items-center gap-2'>
                                            <FileText className='w-4 h-4 text-[#104c80]' /> {form.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {form.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </div>
                                    <p className='text-sm text-gray-600'><span className='font-medium'>Created:</span> {formatDate(form.createdAt)}</p>
                                    <p className='text-sm text-gray-600'><span className='font-medium'>Updated:</span> {formatDate(form.updatedAt)}</p>
                                    <p className='text-sm text-gray-600'><span className='font-medium'>Time left:</span> {timer[form._id]}</p>
                                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => navigate(`/view/${form._id}`)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition" title="View"><Eye className="w-4 h-4" /></button>
                                            <button onClick={() => navigate(`/form-editor/${form._id}`)} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition" title="Edit"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => handleDownloadHTML(form)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition" title="Download"><Download className="w-4 h-4" /></button>
                                        </div>
                                        <button onClick={() => setDeleteConfirm(form._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className='fixed px-3 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-2xl shadow-2xl w-96 animate-fadeIn'>
                        <h3 className='text-xl font-bold text-[#104c80] mb-4'>Delete Confirmation</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this form?</p>
                        <div className='flex justify-end gap-3'>
                            <button onClick={() => setDeleteConfirm(null)} className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'>Cancel</button>
                            <button onClick={() => handleDeleteForm(deleteConfirm)} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlanningRequestedDocument
