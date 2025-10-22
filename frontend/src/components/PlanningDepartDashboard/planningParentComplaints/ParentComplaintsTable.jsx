import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaEye,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaExclamationTriangle,
} from "react-icons/fa";

// ✅ Helper for exact date/time
const formatDateTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

// ✅ Helper for “time ago”
const timeAgo = (date) => {
  if (!date) return "-";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) return `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

const ParentComplaintsTable = ({
  complaints = [],
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
  statusClasses,
}) => {
  const { t } = useTranslation("parentComplaintsTable");

  const headers = [
    { key: "parentName", sortable: true },
    { key: "relation", sortable: true },
    { key: "studentName", sortable: true },
    { key: "class", sortable: true },
    { key: "date", sortable: true },
    { key: "type", sortable: true },
    { key: "severity", sortable: true },
    { key: "impact", sortable: true },
    { key: "expectedAction", sortable: false },
    { key: "assignedTo", sortable: false },
    { key: "status", sortable: false },
    { key: "action", sortable: false },
  ];

  return (
    <>
      {/* ✅ DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#104c80] text-white text-center">
              {headers.map(({ key, sortable }) => (
                <th
                  key={key}
                  onClick={() => sortable && handleSort(key)}
                  className={`py-3 px-4 ${
                    sortable ? "cursor-pointer select-none" : ""
                  } align-middle whitespace-nowrap`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {t(`parentComplaintsTable.headers.${key}`)}
                    {sortable &&
                      (sortConfig?.key === key ? (
                        sortConfig.direction === "ascending" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort className="text-gray-300" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(complaints) && complaints.length > 0 ? (
              complaints.map((c, i) => (
                <tr
                  key={c._id || i}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition-all duration-200 text-center align-middle whitespace-nowrap`}
                >
                  <td className="px-4 py-3">{c.parentName}</td>
                  <td className="px-4 py-3">{c.relationToStudent}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.class}</td>

                  {/* ✅ Date + Time + "Ago" */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-gray-800">
                        {c.createdAt ? formatDateTime(c.createdAt) : "-"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {c.createdAt ? timeAgo(c.createdAt) : ""}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">{c.complaintType}</td>
                  <td className="px-4 py-3">{c.severity}</td>
                  <td className="px-4 py-3">{c.impact}</td>
                  <td className="px-4 py-3">{c.expectedAction}</td>
                  <td className="px-4 py-3">
                    {c.assignedTo?.name ||
                      t("parentComplaintsTable.messages.unassigned")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        statusClasses[c.status] || "text-gray-500"
                      } font-medium`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2">
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("parentComplaintsTable.messages.noComplaints")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ MOBILE VIEW */}
      <div className="md:hidden space-y-4 mt-4">
        {Array.isArray(complaints) && complaints.length > 0 ? (
          complaints.map((c, i) => (
            <div
              key={c._id || i}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-[#104c80]">{c.parentName}</h4>
                <span className={statusClasses[c.status] || "text-gray-500"}>
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <b>{t("parentComplaintsTable.messages.student")}:</b>{" "}
                {c.studentName} ({c.class})
              </p>
              <p className="text-sm text-gray-600">
                <b>{t("parentComplaintsTable.messages.type")}:</b>{" "}
                {c.complaintType} |{" "}
                <b>{t("parentComplaintsTable.messages.severity")}:</b>{" "}
                {c.severity}
              </p>

              <p className="text-sm text-gray-600">
                Created:{" "}
                {c.createdAt ? (
                  <>
                    {formatDateTime(c.createdAt)}{" "}
                    <span className="text-gray-400 text-xs">
                      ({timeAgo(c.createdAt)})
                    </span>
                  </>
                ) : (
                  "-"
                )}
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
            {t("parentComplaintsTable.messages.noComplaints")}
          </div>
        )}
      </div>
    </>
  );
};

export default ParentComplaintsTable;
