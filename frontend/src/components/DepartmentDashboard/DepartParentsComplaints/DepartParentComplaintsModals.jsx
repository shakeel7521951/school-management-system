import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useChangeParentComplaintStatusMutation } from "../../../redux/slices/ParentComplaintApi";

const DepartParentComplaintModals = ({
  viewModal,
  editModal,
  setViewModal,
  setEditModal,
}) => {
  const { t ,i18n} = useTranslation("departParentComplaintsModals");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // ✅ RTK Mutation hook
  const [changeStatus, { isLoading }] = useChangeParentComplaintStatusMutation();

  // Prefill current values when opening edit modal
  useEffect(() => {
    if (editModal) {
      setStatus(editModal.status || "Pending");
      setMessage(editModal.feedback || "");
    }
  }, [editModal]);

  // ✅ Save handler
  const handleSave = async () => {
    try {
      await changeStatus({
        id: editModal._id,
        status,
        assignedTo: message, // backend expects this field
      }).unwrap();

      setEditModal(null);
    } catch (err) {
      console.error("Error updating complaint:", err);
      alert(t("departmentParentComplaintModals.alerts.updateError"));
    }
  };

  return (
    <AnimatePresence>
      {/* 🔹 VIEW COMPLAINT MODAL */}
      {viewModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" dir={i18n.language=== "ar" ? "rtl" :"ltr"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <h2 className="text-xl font-semibold text-[#104c80] mb-4">
              {t("departmentParentComplaintModals.viewModal.title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.parent")}:</b>{" "}
                {viewModal.parentName}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.relation")}:</b>{" "}
                {viewModal.relationToStudent}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.student")}:</b>{" "}
                {viewModal.studentName}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.class")}:</b>{" "}
                {viewModal.class}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.type")}:</b>{" "}
                {viewModal.complaintType}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.severity")}:</b>{" "}
                {viewModal.severity}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.impact")}:</b>{" "}
                {viewModal.impact}
              </p>
              <p>
                <b>
                  {t("departmentParentComplaintModals.viewModal.expectedAction")}:
                </b>{" "}
                {viewModal.expectedAction}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.date")}:</b>{" "}
                {new Date(viewModal.date).toLocaleDateString()}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.viewModal.status")}:</b>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    viewModal.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : viewModal.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {viewModal.status}
                </span>
              </p>
            </div>

            {/* ✅ Feedback */}
            {viewModal.feedback && (
              <div className="mt-4">
                <p className="font-semibold text-gray-700 mb-1">
                  {t("departmentParentComplaintModals.viewModal.feedbackTitle")}
                </p>
                <div className="bg-gray-50 border rounded-lg p-3 text-gray-600 text-sm">
                  {viewModal.feedback}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewModal(null)}
                className="px-4 py-2 bg-[#104c80] text-white rounded-lg hover:bg-[#0d3c68]"
              >
                {t("departmentParentComplaintModals.viewModal.closeButton")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 🔹 EDIT COMPLAINT MODAL */}
      {editModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <h2 className="text-xl font-semibold text-[#104c80] mb-4">
              {t("departmentParentComplaintModals.editModal.title")}
            </h2>

            {/* Complaint Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg mb-4 border">
              <p>
                <b>{t("departmentParentComplaintModals.editModal.parent")}:</b>{" "}
                {editModal.parentName}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.editModal.student")}:</b>{" "}
                {editModal.studentName}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.editModal.class")}:</b>{" "}
                {editModal.class}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.editModal.type")}:</b>{" "}
                {editModal.complaintType}
              </p>
              <p>
                <b>{t("departmentParentComplaintModals.editModal.status")}:</b>{" "}
                {editModal.status}
              </p>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t("departmentParentComplaintModals.editModal.status")}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">
                    {t(
                      "departmentParentComplaintModals.editModal.statusOptions.pending"
                    )}
                  </option>
                  <option value="Resolved">
                    {t(
                      "departmentParentComplaintModals.editModal.statusOptions.resolved"
                    )}
                  </option>
                  <option value="Rejected">
                    {t(
                      "departmentParentComplaintModals.editModal.statusOptions.rejected"
                    )}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t("departmentParentComplaintModals.editModal.feedbackLabel")}
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows="4"
                  placeholder={t(
                    "departmentParentComplaintModals.editModal.feedbackPlaceholder"
                  )}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditModal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {t("departmentParentComplaintModals.editModal.cancelButton")}
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-sm text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#104c80] hover:bg-[#0d3c68]"
                }`}
              >
                {isLoading
                  ? t("departmentParentComplaintModals.editModal.saving")
                  : t("departmentParentComplaintModals.editModal.saveButton")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DepartParentComplaintModals;
