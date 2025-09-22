import React from "react";
import { X, Download } from "lucide-react";

const ViewDocumentModal = ({ selectedDoc, onClose, getStatusClass }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#104c80]">
            Submission Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="p-4 md:p-6 space-y-4">
          {/* Dynamic Form Data */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Form Data:</p>
            <div className="bg-gray-50 p-3 rounded-md space-y-1">
              {selectedDoc?.formData &&
                Object.entries(selectedDoc.formData).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-100 pb-1"
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {formatLabel(key)}:
                    </span>
                    <span className="text-sm text-gray-900">{value}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Meta Info */}
          <Detail
            label="Form ID"
            value={selectedDoc.formId || "N/A"}
          />
          <Detail
            label="Submitted At"
            value={new Date(selectedDoc.submittedAt).toLocaleString()}
          />
          <Detail
            label="IP Address"
            value={selectedDoc.ipAddress || "N/A"}
          />
          <Detail
            label="User Agent"
            value={selectedDoc.userAgent || "N/A"}
          />

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <span
              className={`text-sm ${getStatusClass(
                selectedDoc.status || "Pending"
              )} px-2.5 py-0.5 rounded-full`}
            >
              {selectedDoc.status || "Pending"}
            </span>
          </div>

          {/* Rejection Note */}
          {selectedDoc.status === "Rejected" && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Rejection Note:
              </p>
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {selectedDoc.note || "No note provided"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-gray-200">
          {/* If in future you store fileUrl in submission */}
          {selectedDoc.fileUrl && (
            <a
              href={selectedDoc.fileUrl}
              download
              className="flex items-center gap-1.5 text-sm text-[#104c80] hover:text-[#0d3a66] font-medium"
            >
              <Download size={16} />
              Download
            </a>
          )}
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

// Helper to make keys look nice
const formatLabel = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default ViewDocumentModal;
