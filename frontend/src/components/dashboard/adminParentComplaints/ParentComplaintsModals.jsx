import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ParentComplaintsModals = ({
  viewModal,
  editModal,
  deleteModal,
  setViewModal,
  setEditModal,
  setDeleteModal,
  departments,
  statuses,
  statusClasses,
  onStatusChange,
  onDelete,
}) => {
  return (
    <>
      {/* --- VIEW MODAL --- */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 shadow-lg relative">
            <button
              onClick={() => setViewModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#104c80]">Complaint Details</h3>
            <div className="space-y-2 text-gray-700">
              {Object.entries({
                Parent: viewModal.parentName,
                Relation: viewModal.relationToStudent,
                Student: viewModal.studentName,
                Class: viewModal.class,
                Date: new Date(viewModal.date).toLocaleDateString(),
                Type: viewModal.complaintType,
                Severity: viewModal.severity,
                Impact: viewModal.impact,
                "Expected Action": viewModal.expectedAction,
                "Assigned To": viewModal.assignedToName || viewModal.assignedTo,
              }).map(([label, value]) => (
                <p key={label}>
                  <b>{label}:</b> {value}
                </p>
              ))}
              <p>
                <b>Status:</b>{" "}
                <span className={statusClasses[viewModal.status]}>{viewModal.status}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/3 shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-[#104c80]">
              Edit Complaint Details
            </h3>
            <p className="mb-2"><b>Parent:</b> {editModal.parentName}</p>
            <p className="mb-2"><b>Student:</b> {editModal.studentName}</p>

            <label className="block mb-2 font-semibold">Assign To:</label>
            <select
              className="w-full border border-gray-300 rounded-xl p-2 mb-4"
              value={editModal.assignedTo}
              onChange={(e) =>
                setEditModal({ ...editModal, assignedTo: e.target.value })
              }
            >
              <option value="">Unassigned</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-semibold">Change Status:</label>
            <select
              className="w-full border border-gray-300 rounded-xl p-2 mb-4"
              value={editModal.status}
              onChange={(e) =>
                setEditModal({ ...editModal, status: e.target.value })
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  onStatusChange({
                    id: editModal._id,
                    status: editModal.status,
                    assignedTo: editModal.assignedTo || null,
                  });
                  setEditModal(null);
                }}
                className="px-4 py-2 bg-[#104c80] text-white rounded-xl hover:bg-[#0d3b65] transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditModal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/3 shadow-lg text-center">
            <FaExclamationTriangle className="text-red-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete the complaint by <b>{deleteModal.parentName}</b> about <b>{deleteModal.studentName}</b>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onDelete(deleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParentComplaintsModals;
