import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import StudentDocumentModal from "./StudentDocumentModal";

const StudentDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      toast.error("Failed to fetch documents");
    }
  };

  const handleUpload = async (formData) => {
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const newDoc = await res.json();
      setDocuments((prev) => [newDoc, ...prev]);
      toast.success("Document uploaded successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-gray-100 to-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-[#14528B]">Documents</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage your school-related documents easily.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
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
      <StudentDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />

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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">File</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Note</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id || doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 border-b">{doc.id}</td>
                    <td className="px-6 py-3 border-b">{doc.title}</td>
                    <td className="px-6 py-3 border-b">{doc.docType}</td>
                    <td className="px-6 py-3 border-b">{doc.fileName}</td>
                    <td className="px-6 py-3 border-b">
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        {doc.status || "Pending Review"}
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
