import React, { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";



const StudentDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [note, setNote] = useState("");

    const handleUpload = () => {
        if (!title || !file) return alert("Please add a title and upload a file.");
        const newDoc = {
            id: documents.length + 1,
            title,
            fileName: file.name,
            status: "Pending Review",
            note,
        };
        setDocuments([...documents, newDoc]);
        setTitle("");
        setFile(null);
        setNote("");
        toast.success("Document uploaded successfully!");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">📄 Student Documents</h1>

            {/* Upload Form */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Document Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <textarea
                        placeholder="Optional Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <button
                        onClick={handleUpload}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <Upload size={16} /> Upload Document
                    </button>
                </div>
            </div>

            {/* Uploaded Documents Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Your Uploaded Documents</h2>
                {documents.length === 0 ? (
                    <p className="text-gray-500">No documents uploaded yet.</p>
                ) : (
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Title</th>
                                <th className="border border-gray-300 p-2">File</th>
                                <th className="border border-gray-300 p-2">Status</th>
                                <th className="border border-gray-300 p-2">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.id}>
                                    <td className="border border-gray-300 p-2">{doc.id}</td>
                                    <td className="border border-gray-300 p-2">{doc.title}</td>
                                    <td className="border border-gray-300 p-2">{doc.fileName}</td>
                                    <td className="border border-gray-300 p-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${doc.status === "Pending Review"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : doc.status === "Approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-2">{doc.note || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StudentDocuments;
