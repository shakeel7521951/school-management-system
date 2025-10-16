import React, { useState } from "react";
import { X, Download, ChevronDown, ChevronUp } from "lucide-react";

const ViewDocumentModal = ({ selectedDoc, onClose, getStatusClass }) => {
  const [formOpen, setFormOpen] = useState(true);

  const renderValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (Array.isArray(value)) return value.map((v) => renderValue(v)).join(", ");
    if (typeof value === "object")
      return Object.entries(value)
        .map(([k, v]) => `${formatLabel(k)}: ${renderValue(v)}`)
        .join(", ");
    return String(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#104c80]">View Submission</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Form Summary: Form ID, Title, Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold text-[#104c80]">Form ID:</span>{" "}
                {selectedDoc.formId?._id || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-[#104c80]">Title:</span>{" "}
                {selectedDoc.formId?.title || "Untitled"}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusClass(
                selectedDoc.status
              )}`}
            >
              {selectedDoc.status || "Pending"}
            </span>
          </div>

          {/* Form Data */}
          {selectedDoc.formData && Object.keys(selectedDoc.formData).length > 0 && (
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setFormOpen(!formOpen)}
              >
                <h4 className="text-md font-semibold text-gray-700">Form Data</h4>
                {formOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>

              {formOpen && (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {Object.entries(selectedDoc.formData).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-gray-100 pb-1"
                    >
                      <span className="font-medium text-gray-500">{formatLabel(key)}:</span>
                      <span className="text-gray-900">{renderValue(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-gray-200">
          {selectedDoc.fileUrl && (
            <a
              href={selectedDoc.fileUrl}
              download
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Download size={16} /> Download
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#104c80] text-white rounded-md font-medium hover:bg-[#0d3a66] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const formatLabel = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default ViewDocumentModal;
