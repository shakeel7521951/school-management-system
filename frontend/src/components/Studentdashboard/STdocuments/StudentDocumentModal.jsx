import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const StudentDocumentModal = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Only PDF, PNG, or JPEG allowed.");
      fileInputRef.current.value = "";
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error("File must be smaller than 5MB.");
      fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!title || !file || !docType) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    formData.append("docType", docType);
    formData.append("file", file);

    onUpload(formData);

    // Reset fields
    setTitle("");
    setNote("");
    setDocType("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h3 className="text-2xl font-bold text-[#14528B]">Upload New Document</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Title */}
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

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="leave">Leave Request</option>
                <option value="contract">Contract</option>
                <option value="approval">Approval</option>
              </select>
            </div>

            {/* File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
              )}
            </div>

            {/* Note */}
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

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 inline-flex items-center justify-center gap-2 text-white font-semibold 
                  bg-gradient-to-r from-[#14528B] via-[#1E88E5] to-[#14528B] 
                  shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 
                  px-5 py-2.5 rounded-lg"
              >
                <Upload size={18} /> Upload
              </button>

              <button
                onClick={onClose}
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
  );
};

export default StudentDocumentModal;
