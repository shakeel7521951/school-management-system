import React, { useState, useEffect } from "react";
import { FaTimes, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import DepartViewModal from "./DepartViewModal";
import { useChangeStComplaintStatusMutation } from "../../../redux/slices/StComplaintApi";
import { useTranslation } from "react-i18next";

const DepartComplaintModals = ({
  viewModal,
  setViewModal,
  editModal,
  setEditModal,
  toast,
  showToast,
  setComplaints,
}) => {
  const { t } = useTranslation("departComplaintModal"); // ✅ Using i18next namespace "complaint"

  const [changeStComplaintStatus, { isLoading: isUpdating }] =
    useChangeStComplaintStatusMutation();

  const [updatedStatus, setUpdatedStatus] = useState("");
  const [comments, setComments] = useState("");

  const [complaintInfo, setComplaintInfo] = useState({
    name: "",
    studentClass: "",
    date: "",
    age: "",
  });

  useEffect(() => {
    if (editModal) {
      setUpdatedStatus(editModal.status || "");
      setComments(editModal.comments || "");
      setComplaintInfo({
        name: editModal.name || "N/A",
        studentClass: editModal.studentClass || "N/A",
        date: editModal.date
          ? new Date(editModal.date).toISOString().split("T")[0]
          : "N/A",
        age: editModal.age || "N/A",
      });
    }
  }, [editModal]);

  const handleSaveChanges = async () => {
    if (!editModal?._id) return;

    try {
      const payload = {
        id: editModal._id,
        status: updatedStatus,
        comments,
      };

      await changeStComplaintStatus(payload).unwrap();

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === editModal._id
            ? { ...c, status: updatedStatus, comments }
            : c
        )
      );

      setComments("");
      showToast(t("success_update"), "success");
      setEditModal(null);
    } catch (error) {
      console.error("Error updating department complaint:", error);
      showToast(t("failed_update"), "error");
    }
  };

  const handleCancelEdit = () => {
    setEditModal(null);
  };

  return (
    <>
      {/* ✅ View Modal */}
      {viewModal && (
        <DepartViewModal viewModal={viewModal} setViewModal={setViewModal} />
      )}

      {/* ✅ Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {t("edit_student_complaint")}
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-5">
              {/* Read-only Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: t("student_name"), value: complaintInfo.name },
                  { label: t("class"), value: complaintInfo.studentClass },
                  { label: t("date"), value: complaintInfo.date },
                  { label: t("age"), value: complaintInfo.age },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={value}
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-50 text-gray-800"
                    />
                  </div>
                ))}
              </div>

              {/* Update Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("update_status")}
                </label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="Pending">{t("pending")}</option>
                  <option value="In Progress">{t("in_progress")}</option>
                  <option value="Resolved">{t("resolved")}</option>
                  <option value="Rejected">{t("rejected")}</option>
                </select>
              </div>

              {/* Comments Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("message_comments")}
                </label>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={t("comments_placeholder")}
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto disabled:opacity-50"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition w-full sm:w-auto disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                    {t("saving")}
                  </>
                ) : (
                  t("save_changes")
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast Notification */}
      {toast?.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 transition-opacity duration-300 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {toast.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
          {toast.message}
        </div>
      )}
    </>
  );
};

export default DepartComplaintModals;
