import React from "react";
import {
  FaUser,
  FaEye,
  FaEdit,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaExclamationTriangle,
} from "react-icons/fa";

// Colors
const typeColors = {
  "Safety at Work": "bg-indigo-100 text-indigo-700",
  "Work Environment": "bg-red-100 text-red-700",
  Colleagues: "bg-orange-100 text-orange-700",
  Management: "bg-green-100 text-green-700",
  Rights: "bg-purple-100 text-purple-700",
  Stress: "bg-cyan-100 text-cyan-700",
};

const severityColors = {
  "simple-note": "bg-gray-100 text-gray-700",
  urgent: "bg-red-100 text-red-700",
  "follow-up": "bg-amber-100 text-amber-700",
  serious: "bg-purple-100 text-purple-700",
};

const statusColors = {
  submitted: "bg-yellow-100 text-yellow-700",
  pending: "bg-yellow-100 text-yellow-700",
  "in progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const TeacherComplaintTable = ({
  paginatedComplaints,
  filteredComplaints,
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* --- TABLE VIEW (hidden on small screens) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#10448c] text-white text-sm whitespace-nowrap">
              {[
                { key: "employeeName", label: "Employee Name", width: "w-40" },
                { key: "jobTitle", label: "Job Title", width: "w-40" },
                { key: "department", label: "Department", width: "w-28" },
                { key: "date", label: "Date", width: "w-28" },
                { key: "type", label: "Type", width: "w-36" },
                { key: "severity", label: "Severity", width: "w-28" },
                { key: "impact", label: "Impact", width: "w-28" },
                { key: "expectedAction", label: "Expected Action", width: "w-44" },
                { key: "status", label: "Status", width: "w-28" },
                { key: "Action", label: "Action", width: "w-28" },
              ].map(({ key, label, width }) => (
                <th
                  key={key}
                  onClick={() =>
                    !["expectedAction", "Action"].includes(key) &&
                    handleSort(key)
                  }
                  className={`${width} py-1 px-1 text-center text-[12px] font-semibold uppercase tracking-wide cursor-pointer whitespace-nowrap`}
                >
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                    {label}
                    {!["expectedAction", "Action"].includes(key) && (
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
                key={c._id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition text-sm whitespace-nowrap`}
              >
                <td className="px-3 py-2 flex items-center gap-3 whitespace-nowrap">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaUser className="text-indigo-600 text-sm" />
                  </div>
                  <span className="font-medium">{c.employeeName}</span>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">{c.jobTitle}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">{c.department}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  {c.date ? new Date(c.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-2 py-2 text-center whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <span
                    className={`px-1 py-1 text-xs rounded-full whitespace-nowrap ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">{c.impact}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">{c.expectedAction}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <span
                    className={`px-1 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                      statusColors[c.status?.toLowerCase()]
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-2 whitespace-nowrap">
                    <button
                      onClick={() => setViewModal({ ...c })}
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditModal({ ...c })}
                      className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setDeleteModal(c)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-6 text-center text-gray-400 text-sm whitespace-nowrap"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARD VIEW (visible only on small screens) --- */}
      <div className="block md:hidden p-4 space-y-4">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-2 whitespace-nowrap"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b pb-2 whitespace-nowrap">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaUser className="text-indigo-600 text-sm" />
                </div>
                <h3 className="font-semibold text-gray-900">{c.employeeName}</h3>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2 whitespace-nowrap">
                <p>
                  <b>Job Title:</b> {c.jobTitle}
                </p>
                <p>
                  <b>Department:</b> {c.department}
                </p>
                <p>
                  <b>Date:</b> {c.date ? new Date(c.date).toLocaleDateString() : "-"}
                </p>
                <p>
                  <b>Impact:</b> {c.impact}
                </p>
                <p className="col-span-2">
                  <b>Type:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </p>
                <p className="col-span-2">
                  <b>Severity:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </p>
                <p className="col-span-2">
                  <b>Expected Action:</b> {c.expectedAction}
                </p>
                <p className="col-span-2">
                  <b>Status:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      statusColors[c.status?.toLowerCase()]
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-3 border-t mt-2 whitespace-nowrap">
                <button
                  onClick={() => setViewModal({ ...c })}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => setEditModal({ ...c })}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteModal(c)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 whitespace-nowrap">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            No complaints found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherComplaintTable;
