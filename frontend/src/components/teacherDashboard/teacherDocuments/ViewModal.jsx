import React from "react";
import { FileText, Download, X } from "lucide-react";

const ViewModal = ({ doc, onClose, onDownload, getStatusBadge }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#1e64a9] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <FileText size={20} />
            <h3 className="text-lg font-semibold">Document Details</h3>
          </div>
          <div className="flex items-center gap-3">
            {doc.fileName && (
              <button onClick={() => onDownload(doc)} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md text-white hover:bg-white/20 transition">
                <Download size={16} /> Download
              </button>
            )}
            <button onClick={onClose} className="text-white/90 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Title</p>
              <p className="font-medium text-gray-800">{doc.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Type</p>
              <p className="font-medium text-gray-800">{doc.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{doc.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.status)}`}>
                {doc.status}
              </span>
            </div>
          </div>

          {/* File info */}
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-500">File</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600">📄</div>
                <div>
                  <p className="font-medium text-gray-800">{doc.fileName || "No file attached"}</p>
                  <p className="text-xs text-gray-500">Click Download to save</p>
                </div>
              </div>
              <button onClick={() => onDownload(doc)} className="px-3 py-1.5 bg-[#104c80] text-white rounded-md hover:bg-[#0d3a61] transition">
                <Download size={14} />
              </button>
            </div>
          </div>

          {/* Reviewer Notes */}
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-500">Reviewer Notes</p>
            <div className="mt-2 bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-700">{doc.reviewerNotes || "No notes available."}</p>
            </div>
          </div>

          {/* Close */}
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-[#104c80] text-white rounded-lg hover:bg-[#0d3a61] transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
