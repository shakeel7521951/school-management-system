import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const TeacherComplaintModal = ({
  editModal,
  setEditModal,
  saveStatus,
  confirmDelete,
}) => {
  // ✅ Render nothing if no complaint is selected
  if (!editModal) return null;

  const [formData, setFormData] = useState({
    employeeName: "",
    jobTitle: "",
    department: "",
    date: "",
    type: "",
    severity: "",
    impact: "",
    expectedAction: "",
    details: "",
    status: "",
  });

  useEffect(() => {
    if (editModal) {
      setFormData({
        employeeName: editModal.employeeName || "",
        jobTitle: editModal.jobTitle || "",
        department: editModal.department || "",
        date: editModal.date ? new Date(editModal.date).toISOString().split("T")[0] : "",
        type: editModal.type || "",
        severity: editModal.severity || "",
        impact: editModal.impact || "",
        expectedAction: editModal.expectedAction || "",
        details: editModal.details || "",
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Edit Complaint
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
            placeholder="Employee Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setEditModal(null)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherComplaintModal;
