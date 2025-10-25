import React, { useState, useEffect } from "react";
import { FaTimes, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useGetDepartmentsQuery } from "../../../redux/slices/DepartmentApi";

const TeacherComplaintModal = ({
  editModal,
  setEditModal,
  saveStatus,
  toast,
  showToast,
}) => {
  const { t } = useTranslation("teacherComplaintModal");

  // ✅ Fetch departments dynamically
  const { data: departmentsData, isLoading, isError } = useGetDepartmentsQuery();

  const [formData, setFormData] = useState({
    employeeName: "",
    jobTitle: "",
    department: "",
    date: "",
    status: "",
    assignedTo: "",
  });

  // ✅ Prefill modal when opened
  useEffect(() => {
    if (editModal) {
      setFormData({
        employeeName: editModal.employeeName || "",
        jobTitle: editModal.jobTitle || "",
        department: editModal.department || "",
        date: editModal.date
          ? new Date(editModal.date).toISOString().split("T")[0]
          : "",
        status: editModal.status || "",
        assignedTo: editModal.assignedTo || "",
      });
    }
  }, [editModal]);

  if (!editModal) return null;

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated status and assigned department
  const handleSave = async () => {
    try {
      await saveStatus(editModal._id, formData.status, formData.assignedTo);
      showToast(t("teacherComplaintModal.toast.success"), "success");
      setEditModal(null);
    } catch (error) {
      showToast(error?.message || t("teacherComplaintModal.toast.error"), "error");
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {t("teacherComplaintModal.title")}
            </h2>
            <button
              onClick={() => setEditModal(null)}
              className="text-gray-400 hover:text-gray-600"
              aria-label={t("teacherComplaintModal.close")}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Read-only Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["employeeName", "jobTitle", "department", "date"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {t(`teacherComplaintModal.fields.${field}`)}
                  </label>
                  <input
                    type={field === "date" ? "date" : "text"}
                    name={field}
                    value={formData[field]}
                    readOnly
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-50"
                  />
                </div>
              ))}
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("teacherComplaintModal.status.label")}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              >
                <option value="pending">{t("teacherComplaintModal.status.pending")}</option>
                <option value="in progress">{t("teacherComplaintModal.status.in_progress")}</option>
                <option value="resolved">{t("teacherComplaintModal.status.resolved")}</option>
                <option value="rejected">{t("teacherComplaintModal.status.rejected")}</option>
              </select>
            </div>

            {/* Assigned Department Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("teacherComplaintModal.assignedTo.label")}
              </label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                disabled={isLoading || isError}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              >
                <option value="">
                  {isLoading
                    ? t("teacherComplaintModal.assignedTo.loading")
                    : isError
                    ? t("teacherComplaintModal.assignedTo.error")
                    : t("teacherComplaintModal.assignedTo.select")}
                </option>
                {departmentsData?.departments?.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setEditModal(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
            >
              {t("teacherComplaintModal.buttons.cancel")}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition w-full sm:w-auto"
            >
              {t("teacherComplaintModal.buttons.save")}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast?.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
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

export default TeacherComplaintModal;
