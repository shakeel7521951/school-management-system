import React from "react";
import { Upload, X } from "lucide-react";

const UploadModal = ({
  onClose,
  onSubmit,
  uploadTitle,
  setUploadTitle,
  uploadType,
  setUploadType,
  uploadFile,
  handleFileChange,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <div
        className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl 
                   relative overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#1e64a9] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Upload size={20} />
            <h3 className="text-lg font-semibold">Upload Document</h3>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="Document Title"
              required
              className="w-full border border-gray-300/40 bg-white/60 backdrop-blur-sm 
                         px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none"
            />
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              required
              className="w-full border border-gray-300/40 bg-white/60 backdrop-blur-sm 
                         px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none"
            >
              <option value="">Select Type</option>
              <option value="Schedule">Schedule</option>
              <option value="Report">Report</option>
              <option value="Plan">Plan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* File */}
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed 
                       border-gray-300/50 rounded-lg p-6 text-center cursor-pointer 
                       hover:border-[#104c80] bg-white/40 backdrop-blur-sm transition"
          >
            <p className="text-sm text-gray-700">Drag & drop a file here, or click to browse</p>
            <p className="text-xs text-gray-500">PDF, DOCX, XLSX — max 10MB</p>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.pptx"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploadFile && (
              <div className="mt-3 text-sm text-gray-800 bg-white/60 backdrop-blur-md px-3 py-1 rounded">
                Selected: {uploadFile.name}
              </div>
            )}
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300/50 bg-white/50 backdrop-blur-sm 
                         hover:bg-gray-100/50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a61] 
                         text-white hover:opacity-90 transition shadow-md"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
