import React from "react";
import { FaTimes } from "react-icons/fa";

// Colors (same jese ComplaintTable me hain)
const typeColors = {
    Facilities: "bg-purple-100 text-purple-700",
    Emotions: "bg-pink-100 text-pink-700",
    Learning: "bg-indigo-100 text-indigo-700",
    "Work Environment": "bg-yellow-100 text-yellow-700",
    Stress: "bg-orange-100 text-orange-700",
    Rights: "bg-blue-100 text-blue-700",
    "Safety at Work": "bg-red-100 text-red-700",
};

const severityColors = {
    "simple-note": "bg-gray-100 text-gray-700",
    urgent: "bg-red-100 text-red-700",
    "follow-up": "bg-amber-100 text-amber-700",
    serious: "bg-purple-100 text-purple-700",
};

const statusColors = {
    resolve: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
};

const impactColors = {
    physical: "bg-blue-100 text-blue-700",
    emotional: "bg-pink-100 text-pink-700",
    academic: "bg-indigo-100 text-indigo-700",
};

const ViewModal = ({ viewModal, setViewModal }) => {
    if (!viewModal) return null; // agar null hai to kuch render na kare

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
                        <button
                            onClick={() => setViewModal(null)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Complainant</h3>
                            <p className="text-lg font-medium text-gray-900">{viewModal.fullName}</p>
                            <p className="text-sm text-gray-600">
                                Class {viewModal.class}, Age {viewModal.age}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h3>
                            <p className="text-lg text-gray-900">{viewModal.date}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${typeColors[viewModal.complaintType] || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {viewModal.complaintType}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Severity</h3>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${severityColors[viewModal.severity] || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {viewModal.severity}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Expected Action</h3>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[viewModal.expectedAction] || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {viewModal.expectedAction}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Impact</h3>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${impactColors[viewModal.impact] || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {viewModal.impact}
                            </span>
                        </div>
                    </div>

                    {/* Complaint details */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Complaint Details</h3>
                        <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{viewModal.detail}</p>
                    </div>

                    {/* Action Taken (if exists) */}
                    {viewModal.Action && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Action Taken</h3>
                            <p className="text-gray-900 bg-green-50 p-4 rounded-lg">{viewModal.Action}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={() => setViewModal(null)}
                        className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
