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
import { useTranslation } from "react-i18next";

// ✅ Helper: Exact Date + Time (with seconds)
const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
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
  const { t } = useTranslation("teacherComplaintTable");

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* --- TABLE VIEW (Desktop) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#10448c] text-white text-sm whitespace-nowrap">
              {Object.entries(t("table.headers", { returnObjects: true })).map(
                ([key, label]) => (
                  <th
                    key={key}
                    onClick={() =>
                      !["expectedAction", "action"].includes(key) &&
                      handleSort(key)
                    }
                    className="py-4 px-2 text-center text-[12px] font-semibold uppercase tracking-wide cursor-pointer whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                      {label}
                      {!["expectedAction", "action"].includes(key) && (
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
                )
              )}
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
                {/* Employee Name */}
                <td className="px-3 py-2 flex items-center gap-3 whitespace-nowrap">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaUser className="text-indigo-600 text-sm" />
                  </div>
                  <span className="font-medium">{c.employeeName}</span>
                </td>

                <td className="px-3 py-2 text-center">{c.jobTitle}</td>
                <td className="px-3 py-2 text-center">{c.department}</td>

                {/* ✅ CreatedAt (Exact Date + Time) */}
                <td className="px-3 py-2 text-center text-nowrap">
                  {c.createdAt ? formatDateTime(c.createdAt) : "-"}
                </td>

                {/* Type */}
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t(`colors.type.${c.type}`, {
                        defaultValue: t("colors.type.default"),
                      })
                    }`}
                  >
                    {c.type}
                  </span>
                </td>

                {/* Severity */}
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t(`colors.severity.${c.severity}`, {
                        defaultValue: t("colors.severity.default"),
                      })
                    }`}
                  >
                    {c.severity}
                  </span>
                </td>

                <td className="px-3 py-2 text-center">{c.impact}</td>
                <td className="px-3 py-2 text-center">{c.expectedAction}</td>
                <td className="px-3 py-2 text-center">{c.assignedTo?.name}</td>

                {/* Status */}
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      t(`colors.status.${c.status}`, {
                        defaultValue: t("colors.status.default"),
                      })
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-3 py-2 text-center">
                  <div className="flex justify-center gap-2">
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

            {/* No Data */}
            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("table.empty.message")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARD VIEW (Mobile) --- */}
      <div className="block md:hidden p-4 space-y-4">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-2"
            >
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaUser className="text-indigo-600 text-sm" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {c.employeeName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
                <p className="col-span-2">
                  <b>Created At:</b> {formatDateTime(c.createdAt)}
                </p>
                <p>
                  <b>Job Title:</b> {c.jobTitle}
                </p>
                <p>
                  <b>Department:</b> {c.department}
                </p>
                <p>
                  <b>Type:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t(`colors.type.${c.type}`, {
                        defaultValue: t("colors.type.default"),
                      })
                    }`}
                  >
                    {c.type}
                  </span>
                </p>
                <p>
                  <b>Severity:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t(`colors.severity.${c.severity}`, {
                        defaultValue: t("colors.severity.default"),
                      })
                    }`}
                  >
                    {c.severity}
                  </span>
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      t(`colors.status.${c.status}`, {
                        defaultValue: t("colors.status.default"),
                      })
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-3 border-t mt-2">
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
          <div className="text-center text-gray-400">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            {t("card.empty.message")}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherComplaintTable;
