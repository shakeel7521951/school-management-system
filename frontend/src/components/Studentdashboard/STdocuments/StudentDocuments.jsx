// src/pages/StudentDashboard/StudentDocuments.jsx
import React, { useRef, useState } from "react";
import { Upload, FileText, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const StudentDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setTitle("");
        setNote("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUpload = () => {
        if (!title || !file) {
            toast.error("Please enter a title and choose a file.");
            return;
        }

        const newDoc = {
            id: documents.length + 1,
            title,
            fileName: file.name,
            status: "Pending Review",
            note,
            uploadedAt: new Date().toLocaleString(),
        };

        setDocuments((prev) => [newDoc, ...prev]);
        toast.success("Document uploaded successfully!");
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div>
                    <h1 className="text-5xl font-bold text-[#14528B] flex items-center gap-3">
                        <FileText className="text-[#4b8fcf]" /> Student Documents
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Upload and manage your school-related documents easily.
                    </p>
                </div>
                <button
                    onClick={openModal}
                    className="
    mt-4 sm:mt-0 font-bold inline-flex items-center gap-2
    bg-gradient-to-b from-[#14528B] via-[#1a6bb6] to-[#14528B]
    text-white px-5 py-2.5 rounded-xl shadow-lg
    transform transition-transform duration-300 ease-out
    hover:scale-105 active:scale-95 focus:outline-none
    hover:shadow-2xl
  "
                >
                    <Plus size={18} /> Upload Document
                </button>

            </div>

            {/* Modal */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={closeModal}
                    />
                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn">
                            {/* Header */}
                            <div className="flex justify-between items-center p-5 border-b">
                                <h3 className="text-2xl font-bold text-[#14528B]">Upload New Document</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {/* Form */}
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Document Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter document title"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Choose File
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {file && (
                                        <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Note (Optional)
                                    </label>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Add a note"
                                        className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleUpload}
                                        className="flex-1 inline-flex items-center justify-center gap-2 text-white font-semibold 
             bg-gradient-to-r from-[#14528B] via-[#1E88E5] to-[#14528B] 
             shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 
             px-5 py-2.5 rounded-lg"
                                    >
                                        <Upload size={18} /> Upload
                                    </button>

                                    <button
                                        onClick={closeModal}
                                        className="flex-1 inline-flex items-center justify-center gap-2 
             bg-gradient-to-r from-gray-100 to-gray-200 
             text-gray-700 font-medium px-5 py-2.5 rounded-lg 
             hover:shadow-md hover:bg-gray-300 transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Documents Table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Uploaded Documents</h2>
                    <span className="text-sm text-gray-500">Total: {documents.length}</span>
                </div>
                {documents.length === 0 ? (
                    <p className="text-center text-gray-500 py-10 italic">
                        No documents uploaded yet. Click “Upload Document” to get started.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">File</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Note</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Uploaded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 border-b">{doc.id}</td>
                                        <td className="px-6 py-3 border-b">{doc.title}</td>
                                        <td className="px-6 py-3 border-b">{doc.fileName}</td>
                                        <td className="px-6 py-3 border-b">
                                            <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 border-b">{doc.note || "-"}</td>
                                        <td className="px-6 py-3 border-b">{doc.uploadedAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDocuments;
