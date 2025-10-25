import React from "react";
import { useTranslation } from "react-i18next";

export default function TeacherDeleteModal({ deleteModal, setDeleteModal, confirmDelete }) {
  const { t } = useTranslation("teacherDeleteModal");
  if (!deleteModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {t("labels.title")}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {t("labels.message", { employeeName: deleteModal.employeeName })}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModal(null)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
          >
            {t("labels.cancel")}
          </button>
          <button
            onClick={() => confirmDelete(deleteModal._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {t("labels.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
