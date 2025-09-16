import React from "react";
import { X, Download } from "lucide-react";

const ViewDocumentModal = ({ selectedDoc, onClose, getStatusClass }) => {
  // static path (example) → you can also attach `fileUrl` in your `uploads` array
  const fileUrl = "/documents/Resume.pdf";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#104c80]">Document Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="p-4 md:p-6 space-y-4">
          <Detail label="Title" value={selectedDoc.title} />
          <Detail label="Uploader" value={selectedDoc.uploader} />
          <Detail label="Role" value={selectedDoc.role} />
          <Detail label="Type" value={selectedDoc.type} />
          <Detail label="Date" value={new Date(selectedDoc.date).toLocaleDateString()} />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <span
              className={`text-sm ${getStatusClass(selectedDoc.status)} px-2.5 py-0.5 rounded-full`}
            >
              {selectedDoc.status}
            </span>
          </div>

          {selectedDoc.status === "Rejected" && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-1">Rejection Note:</p>
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{selectedDoc.note}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-gray-200">
          <a
            href={fileUrl}
            download
            className="flex items-center gap-1.5 text-sm text-[#104c80] hover:text-[#0d3a66] font-medium"
          >
            <Download size={16} />
            Download
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#104c80] text-white text-sm font-medium rounded-md hover:bg-[#0d3a66] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-500">{label}:</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
);

export default ViewDocumentModal;
