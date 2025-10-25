import React from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DepartTeacherComplaintViewModal = ({ viewModal, setViewModal }) => {
  const { t } = useTranslation("departTeacherComplaintViewModal");

  if (!viewModal) return null;

  // ✅ Color mappings from localization file
  const typeColors = t("colors.type", { returnObjects: true });
  const severityColors = t("colors.severity", { returnObjects: true });
  const statusColors = t("colors.status", { returnObjects: true });
  const impactColors = t("colors.impact", { returnObjects: true });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {t("labels.modalTitle")}
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
                {t("labels.complainant")}
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {viewModal.employeeName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">{t("labels.jobTitle")}:</span>{" "}
                {viewModal.jobTitle}
                <br />
                <span className="font-bold">{t("labels.department")}:</span>{" "}
                {viewModal.department}
              </p>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                {t("labels.dateSubmitted")}
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
                {t("labels.type")}
              </h3>
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
                {t("labels.severity")}
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
                {t("labels.expectedAction")}
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
                {t("labels.impact")}
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
              {t("labels.complaintDetails")}
            </h3>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
              {viewModal.details || t("noDetails", { defaultValue: "No additional details provided." })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setViewModal(null)}
            className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition"
          >
            {t("labels.closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartTeacherComplaintViewModal;
