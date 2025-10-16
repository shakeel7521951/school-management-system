import React, { useState } from "react";
import { X, Download, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ViewDocumentModal = ({ selectedDoc, onClose, getStatusClass }) => {
  const { t } = useTranslation("viewDocumentModal"); // JSON namespace
  const [formOpen, setFormOpen] = useState(true);

  const renderValue = (value) => {
    if (value === null || value === undefined) return t("modal.placeholders.nA");
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
          <h3 className="text-xl font-semibold text-[#104c80]">{t("modal.title")}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Form Data */}
        
          {selectedDoc.formData && (
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setFormOpen(!formOpen)}
              >
                <h4 className="text-md font-semibold text-gray-700">{t("modal.sections.formData.title")}</h4>
                {formOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {formOpen && (
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  {Object.entries(selectedDoc.formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="font-medium text-gray-500">{formatLabel(key)}:</span>
                      <span className="text-gray-900">{renderValue(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            <Detail label={t("modal.sections.metaInfo.formId")} value={selectedDoc.formId} />
            <Detail
              label={t("modal.sections.metaInfo.submittedAt")}
              value={new Date(selectedDoc.submittedAt).toLocaleString()}
            />
            <Detail label={t("modal.sections.metaInfo.ipAddress")} value={selectedDoc.ipAddress} />
            <Detail label={t("modal.sections.metaInfo.userAgent")} value={selectedDoc.userAgent} />
            <Detail
              label={t("modal.sections.metaInfo.status")}
              value={
                <span
                  className={`px-2.5 py-1 rounded-full text-sm font-medium ${getStatusClass(
                    selectedDoc.status || "Pending"
                  )}`}
                >
                  {selectedDoc.status || t("modal.placeholders.nA")}
                </span>
              }
            />
          </div>

          {/* Rejection Note */}
          {selectedDoc.status === "Rejected" && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              <h4 className="font-semibold mb-1">{t("modal.sections.rejectionNote.title")}</h4>
              <p className="text-sm">{selectedDoc.note || t("modal.sections.rejectionNote.noNote")}</p>
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
              <Download size={16} /> {t("modal.actions.download")}
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#104c80] text-white rounded-md font-medium hover:bg-[#0d3a66] transition-colors"
          >
            {t("modal.actions.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm border border-amber-950" >
    <span className="font-medium text-gray-500">{label}:</span>
    <span className="text-gray-900">{value ?? "N/A"}</span>
  </div>
);

const formatLabel = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default ViewDocumentModal;
