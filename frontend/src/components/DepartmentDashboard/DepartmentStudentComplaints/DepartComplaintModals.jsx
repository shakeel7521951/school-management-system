import React, { useState, useEffect } from "react";
import { FaTimes, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import DepartViewModal from "./DepartViewModal";


const DepartComplaintModals = ({
  viewModal,
  setViewModal,
  editModal,
  setEditModal,
  toast,
}) => {
  

  const statusColors = {
    resolve: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    "in progress": "bg-blue-100 text-blue-700",
  };

  const [updatedStatus, setUpdatedStatus] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (editModal) {
      setUpdatedStatus(editModal.status || "");
      setComments(editModal.comments || "");
    }
  }, [editModal]);

  const handleSaveChanges = () => {
    console.log("Updated Values:", {
      status: updatedStatus,
      assignedTo,
      comments,
    });
    setEditModal(null);
  };

  const handleCancelEdit = () => {
    setEditModal(null);
  };

  return (
    <>
      {/* View Modal */}
      {viewModal && <DepartViewModal viewModal={viewModal} setViewModal={setViewModal} />}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Edit Complaint Status
              </h2>
              <button onClick={handleCancelEdit} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    statusColors[editModal.status?.toLowerCase()] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {editModal.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Status
                </label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast?.show && (
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

export default DepartComplaintModals;
