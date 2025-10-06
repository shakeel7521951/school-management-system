import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TeacherComplaintModal = ({
  editModal,
  setEditModal,
  saveStatus,
}) => {
  const { t } = useTranslation("teacherComplaintModal"); // always runs
  const [formData, setFormData] = useState({
    employeeName: "",
    jobTitle: "",
    department: "",
    date: "",
    status: "",
  });

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
      });
    }
  }, [editModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveStatus(editModal._id, formData.status);
    setEditModal(null);
  };

  // ✅ Move the "no complaint selected" check AFTER hooks
  if (!editModal) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {t("title")}
          </h2>
          <button
            onClick={() => setEditModal(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3">
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder={t("placeholders.employeeName")}
            className="w-full border rounded px-3 py-2"
            readOnly
          />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder={t("placeholders.jobTitle")}
            className="w-full border rounded px-3 py-2"
            readOnly
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder={t("placeholders.department")}
            className="w-full border rounded px-3 py-2"
            readOnly
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder={t("placeholders.date")}
            className="w-full border rounded px-3 py-2"
            readOnly
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="submitted">{t("statusOptions.submitted")}</option>
            <option value="pending">{t("statusOptions.pending")}</option>
            <option value="in progress">{t("statusOptions.in_progress")}</option>
            <option value="resolved">{t("statusOptions.resolved")}</option>
            <option value="rejected">{t("statusOptions.rejected")}</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setEditModal(null)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {t("buttons.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t("buttons.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherComplaintModal;
