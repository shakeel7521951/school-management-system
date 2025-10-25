import React from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Colors
const typeColors = {
  Facilities: "bg-purple-100 text-purple-700",
  Emotions: "bg-pink-100 text-pink-700",
  Learning: "bg-indigo-100 text-indigo-700",
  "Work Environment": "bg-yellow-100 text-yellow-700",
  Rights: "bg-blue-100 text-blue-700",
  "Safety at Work": "bg-red-100 text-red-700",
};

const severityColors = {
  "simple-note": "bg-gray-100 text-gray-700",
  urgent: "bg-red-100 text-red-700",
  "follow-up": "bg-amber-100 text-amber-700",
  serious: "bg-purple-100 text-purple-700",
};

const statusColors = {
  resolve: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  any: "bg-gray-100 text-gray-700",
};

const impactColors = {
  physical: "bg-blue-100 text-blue-700",
  emotional: "bg-pink-100 text-pink-700",
  academic: "bg-indigo-100 text-indigo-700",
};

const ViewModal = ({ viewModal, setViewModal }) => {
  const { t } = useTranslation("adminStudentComplaints");

  if (!viewModal) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {t("modals.view_title")}
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
                {t("modals.view_modal.complainant")}
              </h3>
              <p className="text-lg font-medium text-gray-900">{viewModal.name}</p>
              <p className="text-sm text-gray-600">
              <span className="font-bold">{t("table.columns.detail")}</span>: <br />
                {t("table.columns.class")} {viewModal.studentClass} <br /> {t("table.columns.age")} {viewModal.age}
              </p>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("modals.view_modal.date_submitted")}
              </h3>
              <p className="text-lg text-gray-900">
                {viewModal.date
                  ? new Date(viewModal.date).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            {/* Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("modals.view_modal.type")}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  typeColors[viewModal.type] || "bg-gray-100 text-gray-700"
                }`}
              >
                {viewModal.type}
              </span>
            </div>

            {/* Severity */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("modals.view_modal.severity")}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  severityColors[viewModal.severity?.toLowerCase()] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {viewModal.severity}
              </span>
            </div>

            {/* Expected Action */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("modals.view_modal.expected_action")}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  statusColors[viewModal.action?.toLowerCase()] || "bg-gray-100 text-gray-700"
                }`}
              >
                {viewModal.action}
              </span>
            </div>

            {/* Impact */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("modals.view_modal.impact")}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  impactColors[viewModal.impact?.toLowerCase()] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {viewModal.impact}
              </span>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              {t("modals.view_modal.details")}
            </h3>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
              {viewModal.details}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setViewModal(null)}
            className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition"
          >
            {t("modals.view_modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
