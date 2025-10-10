import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChangeParentComplaintStatusMutation } from "../../../redux/slices/ParentComplaintApi"; // adjust path

const DepartParentComplaintModals = ({
  viewModal,
  editModal,
  setViewModal,
  setEditModal,
}) => {
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

  // ✅ Save handler (calls backend + closes modal)
  const handleSave = async () => {
    try {
      await changeStatus({
        id: editModal._id,
        status,
        assignedTo: message, // backend expects "assignedTo" field, but we use it for feedback
      }).unwrap();

      setEditModal(null);
    } catch (err) {
      console.error("Error updating complaint:", err);
      alert("Failed to update complaint status.");
    }
  };

  return (
    <AnimatePresence>
      {/* 🔹 VIEW COMPLAINT MODAL */}
      {viewModal && (
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
              Complaint Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p><b>Parent:</b> {viewModal.parentName}</p>
              <p><b>Relation:</b> {viewModal.relationToStudent}</p>
              <p><b>Student:</b> {viewModal.studentName}</p>
              <p><b>Class:</b> {viewModal.class}</p>
              <p><b>Type:</b> {viewModal.complaintType}</p>
              <p><b>Severity:</b> {viewModal.severity}</p>
              <p><b>Impact:</b> {viewModal.impact}</p>
              <p><b>Expected Action:</b> {viewModal.expectedAction}</p>
              <p><b>Date:</b> {new Date(viewModal.date).toLocaleDateString()}</p>
              <p>
                <b>Status:</b>{" "}
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

            {/* ✅ Show feedback if exists */}
            {viewModal.feedback && (
              <div className="mt-4">
                <p className="font-semibold text-gray-700 mb-1">Department Feedback:</p>
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
                Close
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
              Edit Parents Complaints
            </h2>

            {/* Complaint Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg mb-4 border">
              <p><b>Parent:</b> {editModal.parentName}</p>
              <p><b>Student:</b> {editModal.studentName}</p>
              <p><b>Class:</b> {editModal.class}</p>
              <p><b>Type:</b> {editModal.complaintType}</p>
              <p><b>Status:</b> {editModal.status}</p>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                Feedback / Comments
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows="4"
                  placeholder="Enter remarks, actions taken, or feedback to parent..."
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
                Cancel
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
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DepartParentComplaintModals;
