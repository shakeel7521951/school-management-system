import React, { useState } from "react";
import { X } from "lucide-react";
import { useUpdateVisitorStatusMutation } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";

const VisitorEditModal = ({ visitor, onClose }) => {
  const { t } = useTranslation("receptionistEditModal");
  const [status, setStatus] = useState(visitor.status || "pending");
  const [updateVisitorStatus, { isLoading }] = useUpdateVisitorStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateVisitorStatus({ id: visitor._id, status }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-gray-100">
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* --- Title --- */}
        <h2 className="text-xl font-semibold text-[#104c80] text-center mb-5">
          {t("visitorEditModal.title")}
        </h2>

        {/* --- Visitor Details (Read-only) --- */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-5 border border-gray-100">
          <p>
            <span className="font-semibold text-gray-700">{t("visitorEditModal.labels.fullName")}: </span>
            <span className="text-gray-600">{visitor.name || t("visitorEditModal.fallback.empty")}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">{t("visitorEditModal.labels.idOrPassport")}: </span>
            <span className="text-gray-600">{visitor.governmentId || t("visitorEditModal.fallback.empty")}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">{t("visitorEditModal.labels.department")}: </span>
            <span className="text-gray-600">{visitor.hostDepartment || t("visitorEditModal.fallback.empty")}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">{t("visitorEditModal.labels.purpose")}: </span>
            <span className="text-gray-600">{visitor.reason || t("visitorEditModal.fallback.empty")}</span>
          </p>
        </div>

        {/* --- Status Selector --- */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            {t("visitorEditModal.labels.status")}
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#104c80]"
          >
            <option value="pending">{t("visitorEditModal.statusOptions.pending")}</option>
            <option value="approved">{t("visitorEditModal.statusOptions.approved")}</option>
            <option value="rejected">{t("visitorEditModal.statusOptions.rejected")}</option>
          </select>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            {t("visitorEditModal.buttons.cancel")}
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-4 py-2 text-sm rounded-md bg-[#104c80] text-white hover:bg-[#0c3b67] transition disabled:opacity-60"
          >
            {isLoading ? t("visitorEditModal.buttons.saving") : t("visitorEditModal.buttons.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorEditModal;
