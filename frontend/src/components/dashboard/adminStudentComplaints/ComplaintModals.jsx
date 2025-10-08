import React, { useState, useEffect } from "react";
import { FaTimes, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import ViewModal from "./ViewModal";
import { useChangeStComplaintStatusMutation } from "../../../redux/slices/StComplaintApi";
import { useGetDepartmentsQuery } from "../../../redux/slices/DepartmentApi";
import { useTranslation } from "react-i18next";

const ComplaintModals = ({
  viewModal,
  setViewModal,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
  setComplaints,
  showToast,
  toast,
}) => {
  const { t } = useTranslation("adminStudentComplaints");

  // Fetch departments dynamically
  const {
    data: departmentsData,
    isLoading: deptLoading,
    isError: deptError,
  } = useGetDepartmentsQuery();

  const statusColors = {
    resolve: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    "in progress": "bg-blue-100 text-blue-700",
  };

  const [changeStatus, { isLoading }] = useChangeStComplaintStatusMutation();
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (editModal) {
      setUpdatedStatus(editModal.status || "");
      setAssignedTo(editModal.assignedTo || "");
      setComments(editModal.comments || "");
    }
  }, [editModal]);

  const handleSaveChanges = async () => {
    if (!editModal) return;

    try {
      const res = await changeStatus({
        id: editModal._id,
        status: updatedStatus,
        assignedTo,
        comments,
      }).unwrap();

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === editModal._id ? { ...c, ...res.complaint } : c
        )
      );

      showToast(t("modals.toast.status_updated"), "success");
      setEditModal(null);
    } catch (error) {
      showToast(
        error?.data?.message || t("modals.toast.status_error"),
        "error"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditModal(null);
  };

  return (
    <>
      {/* View Modal */}
      {viewModal && (
        <ViewModal viewModal={viewModal} setViewModal={setViewModal} />
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {t("modals.edit_title")}
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
              {/* Current Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("modals.current_status")}
                </label>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    statusColors[editModal.status.toLowerCase()] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {editModal.status}
                </span>
              </div>

              {/* Update Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("modals.update_status")}
                </label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="Pending">
                    {t("modals.status_options.pending")}
                  </option>
                  <option value="In Progress">
                    {t("modals.status_options.in_progress")}
                  </option>
                  <option value="Resolved">
                    {t("modals.status_options.resolved")}
                  </option>
                  <option value="Rejected">
                    {t("modals.status_options.rejected")}
                  </option>
                </select>
              </div>

              {/* Assigned To (Dynamic Departments) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("modals.assigned_to")}
                </label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  disabled={deptLoading}
                >
                  <option value="">
                    {deptLoading
                      ? "Loading departments..."
                      : "Select Department"}
                  </option>
                  {!deptLoading &&
                    !deptError &&
                    departmentsData?.departments?.map((dept) => (
                      <option key={dept._id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                </select>

                {deptError && (
                  <p className="text-red-500 text-sm mt-1">
                    Failed to load departments. Try again later.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
              >
                {t("modals.cancel")}
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition w-full sm:w-auto"
              >
                {isLoading
                  ? t("modals.saving") || "Saving..."
                  : t("modals.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 transition-opacity duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
          {toast.message}
        </div>
      )}
    </>
  );
};

export default ComplaintModals;
