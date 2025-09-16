import React from "react";
import { FaTimes, FaExclamationTriangle, FaCheck } from "react-icons/fa";
import ViewModal from "./ViewModal";

const ComplaintModals = ({
    viewModal,
    setViewModal,
    editModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    saveStatus,
    confirmDelete,
    setComplaints,
    showToast,
    toast,
}) => {
    const assignedOptions = [
        "Maintenance Dept",
        "Counseling Office",
        "Academic Office",
        "IT Department",
        "Transport Office",
        "HR Department",
        "Administration",
    ];

    const statusColors = {
        resolve: "bg-green-100 text-green-700",
        pending: "bg-red-100 text-red-700",
        rejected: "bg-gray-100 text-gray-700",
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
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Update Complaint Status</h2>
                            <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 sm:p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[editModal.status] || "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {editModal.status}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                                <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                                    defaultValue={editModal.status}
                                    onChange={(e) => saveStatus(editModal.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                                <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                                    value={editModal.assignedTo || ""}
                                    onChange={(e) => {
                                        const newVal = e.target.value;
                                        setComplaints((prev) =>
                                            prev.map((c) =>
                                                c.id === editModal.id ? { ...c, assignedTo: newVal } : c
                                            )
                                        );
                                        setEditModal((prev) =>
                                            prev ? { ...prev, assignedTo: newVal } : prev
                                        );
                                    }}
                                >
                                    {assignedOptions.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                                <textarea
                                    rows="3"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                                    value={editModal.comments || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setComplaints((prev) =>
                                            prev.map((c) =>
                                                c.id === editModal.id ? { ...c, comments: val } : c
                                            )
                                        );
                                        setEditModal((prev) =>
                                            prev ? { ...prev, comments: val } : prev
                                        );
                                    }}
                                ></textarea>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => setEditModal(null)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setEditModal(null);
                                    showToast("Changes saved successfully", "success");
                                }}
                                className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition w-full sm:w-auto"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl">
                        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Confirm Deletion</h2>
                            <button onClick={() => setDeleteModal(null)} className="text-gray-400 hover:text-gray-600">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <div className="p-4 sm:p-6 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <FaExclamationTriangle className="text-red-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Are you sure you want to delete this complaint?</h3>
                                    <p className="text-sm text-gray-600">This action cannot be undone.</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-900">
                                    {deleteModal.fullName} - {deleteModal.complaintType}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {deleteModal.description?.substring(0, 100)}...
                                </p>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => confirmDelete(deleteModal.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                            >
                                Delete Complaint
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
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

export default ComplaintModals;
