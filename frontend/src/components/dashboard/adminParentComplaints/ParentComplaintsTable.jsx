import React from "react";
import {
  FaEye,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaExclamationTriangle,
} from "react-icons/fa";

const ParentComplaintsTable = ({
  complaints = [], // ✅ Prevents "undefined.length" crash
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
  statusClasses,
}) => {
  return (
    <>
      {/* TABLE */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#104c80] text-white text-[]">
              {[
                "Parent Name",
                "Relation",
                "Student Name",
                "Class",
                "Date",
                "Type",
                "Severity",
                "Impact",
                "Expected Action",
                "Assigned To",
                "Status",
                "Action",
              ].map((header, idx) => (
               <th
  key={idx}
  onClick={() =>
    !["Expected Action", "Action", "Assigned To", "Status"].includes(header) &&
    handleSort(header.toLowerCase().replace(" ", ""))
  }
  className="py-4 px-3 text-center cursor-pointer whitespace-nowrap"
>
                  <div className="flex items-center justify-center gap-1">
                    {header}
                    {sortConfig?.key === header.toLowerCase().replace(" ", "") ? (
                      sortConfig.direction === "ascending" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      !["Expected Action", "Action", "Assigned To", "Status"].includes(header) && (
                        <FaSort className="text-gray-300" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(complaints) && complaints.length > 0 ? (
              complaints.map((c, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                >
                  <td className="px-3 py-3">{c.parentName}</td>
                  <td className="px-3 py-3 text-center">{c.relationToStudent}</td>
                  <td className="px-3 py-3 text-center">{c.studentName}</td>
                  <td className="px-3 py-3 text-center">{c.class}</td>
                  <td className="px-3 py-3 text-center">
                    {new Date(c.date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 text-center">{c.complaintType}</td>
                  <td className="px-3 py-3 text-center">{c.severity}</td>
                  <td className="px-3 py-3 text-center">{c.impact}</td>
                  <td className="px-3 py-3 text-center">{c.expectedAction}</td>
                  <td className="px-3 py-3 text-center">{c.assignedTo}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={statusClasses[c.status]}>{c.status}</span>
                  </td>
                  <td className="px-3 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setViewModal(c)}
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditModal(c)}
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="px-4 py-6 text-center text-gray-400 text-sm">
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4 mt-4">
        {Array.isArray(complaints) && complaints.length > 0 ? (
          complaints.map((c, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-[#104c80]">{c.parentName}</h4>
                <span className={statusClasses[c.status]}>{c.status}</span>
              </div>
              <p className="text-sm text-gray-600">
                <b>Student:</b> {c.studentName} ({c.class})
              </p>
              <p className="text-sm text-gray-600">
                <b>Type:</b> {c.complaintType} | <b>Severity:</b> {c.severity}
              </p>
              <p className="text-sm text-gray-600">
                <b>Date:</b> {new Date(c.date).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-3 gap-2">
                <button
                  onClick={() => setViewModal(c)}
                  className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => setEditModal(c)}
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
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            No complaints found.
          </div>
        )}
      </div>
    </>
  );
};

export default ParentComplaintsTable;
