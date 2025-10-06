import React from "react";
import { FaTimes } from "react-icons/fa";

const DepartTeacherComplaintViewModal = ({ viewModal, setViewModal }) => {
  if (!viewModal) return null;

  // ✅ Local color mappings (no translation JSON)
  const typeColors = {
    Behavioral: "bg-red-100 text-red-700",
    Performance: "bg-yellow-100 text-yellow-700",
    Other: "bg-gray-100 text-gray-700",
    default: "bg-gray-100 text-gray-600",
  };

  const severityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-600",
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    "in progress": "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-600",
  };

  const impactColors = {
    critical: "bg-red-100 text-red-700",
    moderate: "bg-yellow-100 text-yellow-700",
    minimal: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Complaint Details
            </h2>
            <button
              onClick={() => setViewModal(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Complainant */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Complainant
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {viewModal.employeeName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Job Title:</span> {viewModal.jobTitle}
                <br />
                <span className="font-bold">Department:</span>{" "}
                {viewModal.department}
              </p>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Date Submitted
              </h3>
              <p className="text-lg text-gray-900">
                {viewModal.date
                  ? new Date(viewModal.date).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            {/* Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  typeColors[viewModal.type] || typeColors.default
                }`}
              >
                {viewModal.type}
              </span>
            </div>

            {/* Severity */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Severity
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  severityColors[viewModal.severity?.toLowerCase()] ||
                  severityColors.default
                }`}
              >
                {viewModal.severity}
              </span>
            </div>

            {/* Expected Action */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Expected Action
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  statusColors[viewModal.status?.toLowerCase()] ||
                  statusColors.default
                }`}
              >
                {viewModal.expectedAction}
              </span>
            </div>

            {/* Impact */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Impact
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  impactColors[viewModal.impact?.toLowerCase()] ||
                  impactColors.default
                }`}
              >
                {viewModal.impact}
              </span>
            </div>
          </div>

          {/* Complaint details */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Complaint Description
            </h3>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
              {viewModal.details || "No additional details provided."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setViewModal(null)}
            className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartTeacherComplaintViewModal;
