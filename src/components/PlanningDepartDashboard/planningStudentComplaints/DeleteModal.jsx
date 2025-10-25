import React from "react";
import { useTranslation } from "react-i18next";

export default function DeleteModal({ deleteModal, setDeleteModal, confirmDelete }) {
  const { t } = useTranslation("adminStudentComplaints");

  if (!deleteModal) return null; // only show when a complaint is set

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {t("modals.delete_title")}
        </h2>

        {/* Show complaint name */}
        <p className="text-gray-600 mb-6">
          {t("modals.delete_confirmation", { name: deleteModal.name })}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModal(null)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
          >
            {t("modals.cancel")}
          </button>
          <button
            onClick={() => confirmDelete(deleteModal._id || deleteModal.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {t("modals.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
