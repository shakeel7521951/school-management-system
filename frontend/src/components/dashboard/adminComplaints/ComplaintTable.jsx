import React from "react";
import { FaUser, FaEye, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaExclamationTriangle } from "react-icons/fa";

// Colors
const typeColors = {
    Bullying: "bg-indigo-100 text-indigo-700",
    "Physical Safety": "bg-red-100 text-red-700", 
    Staff: "bg-orange-100 text-orange-700",
    Learning: "bg-green-100 text-green-700",
    Facilities: "bg-purple-100 text-purple-700",
    Bus: "bg-cyan-100 text-cyan-700",
    Emotions: "bg-pink-100 text-pink-700",
    Rights: "bg-blue-100 text-blue-700",
};

const severityColors = {
    "simple-note": "bg-gray-100 text-gray-700",
    urgent: "bg-red-100 text-red-700",
    "follow-up": "bg-amber-100 text-amber-700",
    serious: "bg-purple-100 text-purple-700",
};

const ComplaintTable = ({
    paginatedComplaints,
    filteredComplaints,
    sortConfig,
    handleSort,
    setViewModal,
    setEditModal,
    setDeleteModal
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                        <tr className="bg-[#10448c] text-white text-sm">
                            {[
                                { key: "id", label: "ID", width: "w-16" },
                                { key: "fullName", label: "Name", width: "w-40" },
                                { key: "class", label: "Class", width: "w-20" },
                                { key: "age", label: "Age", width: "w-20" },
                                { key: "date", label: "Date", width: "w-28" },
                                { key: "complaintType", label: "Type", width: "w-32" },
                                { key: "severity", label: "Severity", width: "w-28" },
                                { key: "impact", label: "Impact", width: "w-28" },
                                { key: "expectedAction", label: "Expected Action", width: "w-32" },
                                { key: "Action", label: "Action", width: "w-28" },
                            ].map(({ key, label, width }) => (
                                <th
                                    key={key}
                                    onClick={() =>
                                        key !== "details" && key !== "expectedAction" && key !== "Action" && handleSort(key)
                                    }
                                    className={`${width} px-1 py-4 text-center font-semibold uppercase tracking-wide cursor-pointer `}
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        {label}
                                        {!(key === "details" || key === "expectedAction" || key === "Action") && (
                                            <>
                                                {sortConfig.key === key ? (
                                                    sortConfig.direction === "ascending" ? (
                                                        <FaSortUp />
                                                    ) : (
                                                        <FaSortDown />
                                                    )
                                                ) : (
                                                    <FaSort className="text-gray-300" />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedComplaints.map((c, i) => (
                            <tr
                                key={c.id}
                                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 transition text-sm`}
                            >
                                {/* ID */}
                                <td className="px-3 py-2 text-center font-medium text-gray-700">
                                    #{c.id}
                                </td>

                                {/* Name */}
                                <td className="px-3 py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-100 p-2 rounded-full">
                                            <FaUser className="text-indigo-600 text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {c.fullName}
                                            </div>
                                            <div className="text-xs text-gray-500">{c.role}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Class */}
                                <td className="px-3 py-2 text-center text-gray-700">{c.class}</td>

                                {/* Age */}
                                <td className="px-3 py-2 text-center text-gray-700">{c.age}</td>

                                {/* Date */}
                                <td className="px-3 py-2 text-center text-gray-600">{c.date}</td>

                                {/* Type */}
                                <td className="px-2 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[c.complaintType] ||
                                            "bg-gray-100 text-gray-700 border border-gray-200"
                                            }`}
                                    >
                                        {c.complaintType}
                                    </span>
                                </td>

                                {/* Severity */}
                                <td className="px-3 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[c.severity] ||
                                            "bg-gray-100 text-gray-700 border border-gray-200"
                                            }`}
                                    >
                                        {c.severity}
                                    </span>
                                </td>

                                {/* Impact */}
                                <td className="px-3 py-2 text-center text-gray-700">{c.impact}</td>

                                {/* Expected Action */}
                                <td className="px-3 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${c.expectedAction === "resolve"
                                            ? "bg-green-100 text-green-700"
                                            : c.expectedAction === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {c.expectedAction}
                                    </span>
                                </td>

                                {/* Action buttons */}
                                <td className="px-3 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => setViewModal({ ...c })}
                                            className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                                            title="View details"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => setEditModal({ ...c })}
                                            className="text-green-600 hover:bg-green-50 p-2 rounded-full transition"
                                            title="Edit complaint"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ ...c })}
                                            className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                                            title="Delete complaint"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* No complaints found */}
                        {filteredComplaints.length === 0 && (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="px-4 py-6 text-center text-gray-400 text-sm"
                                >
                                    <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                                    No complaints found. Try adjusting your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplaintTable;