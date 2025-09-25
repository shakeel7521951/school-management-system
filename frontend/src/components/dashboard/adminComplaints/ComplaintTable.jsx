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

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ComplaintTable = ({
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
            <tr className="bg-[#10448c] text-white text-sm">
              {[
                { key: "name", label: "Name", width: "w-40" },
                { key: "studentClass", label: "Class", width: "w-20" },
                { key: "age", label: "Age", width: "w-20" },
                { key: "date", label: "Date", width: "w-28" },
                { key: "type", label: "Type", width: "w-32" },
                { key: "severity", label: "Severity", width: "w-28" },
                { key: "impact", label: "Impact", width: "w-28" },
                { key: "action", label: "Expected Action", width: "w-32" },
                { key: "status", label: "Status", width: "w-28" },
                { key: "Action", label: "Action", width: "w-28" },
              ].map(({ key, label, width }) => (
                <th
                  key={key}
                  onClick={() =>
                    key !== "details" &&
                    key !== "action" &&
                    key !== "Action" &&
                    handleSort(key)
                  }
                  className={`${width} px-1 py-4 text-center font-semibold uppercase tracking-wide cursor-pointer`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {label}
                    {!(key === "details" || key === "action" || key === "Action") && (
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
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition text-sm`}
              >
                <td className="px-3 py-2 flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaUser className="text-indigo-600 text-sm" />
                  </div>
                  <span className="font-medium">{c.name}</span>
                </td>
                <td className="px-3 py-2 text-center">{c.studentClass}</td>
                <td className="px-3 py-2 text-center">{c.age}</td>
                <td className="px-3 py-2 text-center">
                  {c.date ? new Date(c.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${typeColors[c.type] || "bg-gray-100 text-gray-700"}`}>
                    {c.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${severityColors[c.severity?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}>
                    {c.severity}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">{c.impact}</td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${c.action === "resolve"
                        ? "bg-green-100 text-green-700"
                        : c.action === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {c.action}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[c.status?.toLowerCase()]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => setViewModal({ ...c })} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full">
                      <FaEye />
                    </button>
                    <button onClick={() => setEditModal({ ...c })} className="text-green-600 hover:bg-green-50 p-2 rounded-full">
                      <FaEdit />
                    </button>
                    <button onClick={() => setDeleteModal({ ...c })} className="text-red-600 hover:bg-red-50 p-2 rounded-full">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td colSpan="11" className="px-4 py-6 text-center text-gray-400 text-sm">
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
            <div key={c._id} className="border rounded-lg shadow p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-indigo-600" />
                <h3 className="font-semibold text-gray-900">{c.name}</h3>
              </div>
              <p><b>Class:</b> {c.studentClass}</p>
              <p><b>Age:</b> {c.age}</p>
              <p><b>Date:</b> {c.date ? new Date(c.date).toLocaleDateString() : "-"}</p>
              <p><b>Type:</b> <span className={`px-2 py-1 text-xs rounded-full ${typeColors[c.type] || "bg-gray-100 text-gray-700"}`}>{c.type}</span></p>
              <p><b>Severity:</b> <span className={`px-2 py-1 text-xs rounded-full ${severityColors[c.severity?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}>{c.severity}</span></p>
              <p><b>Impact:</b> {c.impact}</p>
              <p><b>Expected Action:</b> {c.action}</p>
              <p><b>Status:</b> <span className={`px-2 py-1 text-xs rounded-full ${statusColors[c.status?.toLowerCase()]}`}>{c.status}</span></p>

              <div className="flex gap-3 mt-3">
                <button onClick={() => setViewModal({ ...c })} className="text-indigo-600">
                  <FaEye />
                </button>
                <button onClick={() => setEditModal({ ...c })} className="text-green-600">
                  <FaEdit />
                </button>
                <button onClick={() => setDeleteModal({ ...c })} className="text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            No complaints found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintTable;
