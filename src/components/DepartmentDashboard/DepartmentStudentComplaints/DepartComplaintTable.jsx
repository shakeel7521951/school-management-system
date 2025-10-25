import {
  FaUser,
  FaEye,
  FaEdit,
  FaExclamationTriangle,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// 🕒 Helper: Time ago formatter
const getTimeAgo = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

// 🎨 Tag color maps
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
  "simple note": "bg-gray-100 text-gray-700",
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

const DepartComplaintTable = ({
  paginatedComplaints,
  filteredComplaints,
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
}) => {
  const { t } = useTranslation("departComplaintTable");

  const columns = [
    { key: "name", label: t("name"), width: "w-40" },
    { key: "studentClass", label: t("class"), width: "w-20" },
    { key: "age", label: t("age"), width: "w-20" },
    { key: "date", label: t("date"), width: "w-36" },
    { key: "type", label: t("type"), width: "w-32" },
    { key: "severity", label: t("severity"), width: "w-28" },
    { key: "impact", label: t("impact"), width: "w-28" },
    { key: "action", label: t("action"), width: "w-32" },
    { key: "status", label: t("status"), width: "w-28" },
    { key: "actions", label: t("actions"), width: "w-28" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 🖥️ Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#10448c] text-white text-sm">
              {columns.map(({ key, label, width }) => (
                <th
                  key={key}
                  onClick={() =>
                    key !== "actions" && handleSort && handleSort(key)
                  }
                  className={`${width} px-3 py-4 text-center font-semibold uppercase tracking-wide cursor-pointer`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {label}
                    {!(key === "actions") &&
                      sortConfig &&
                      sortConfig.key === key && (
                        <>
                          {sortConfig.direction === "ascending" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )}
                        </>
                      )}
                    {!sortConfig || sortConfig.key !== key ? (
                      <FaSort className="text-gray-300" />
                    ) : null}
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
                <td className="px-3 py-3 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <FaUser className="text-indigo-600 text-sm" />
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  {c.studentClass}
                </td>

                <td className="px-3 py-3 align-middle text-center">{c.age}</td>

                {/* 🕒 Exact Date + Time Ago */}
                <td className="px-3 py-3 align-middle text-center">
                  {c.createdAt ? (
                    <>
                      <div>
                        {new Date(c.createdAt).toLocaleString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getTimeAgo(c.createdAt)}
                      </div>
                    </>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  {c.impact}
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  {c.action}
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[c.status?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="px-3 py-3 align-middle text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setViewModal({ ...c })}
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditModal({ ...c })}
                      className="text-green-600 hover:bg-green-50 p-2 rounded-full transition"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-400 text-sm align-middle"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
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
                <h3 className="font-semibold text-gray-900">{c.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
                <p>
                  <b>Class:</b> {c.studentClass}
                </p>
                <p>
                  <b>Age:</b> {c.age}
                </p>
                <p className="col-span-2">
                  <b>Date:</b>{" "}
                  {c.createdAt ? (
                    <>
                      {new Date(c.createdAt).toLocaleString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                      <br />
                      <span className="text-xs text-gray-500">
                        {getTimeAgo(c.createdAt)}
                      </span>
                    </>
                  ) : (
                    "-"
                  )}
                </p>

                <p>
                  <b>Impact:</b> {c.impact}
                </p>
                <p>
                  <b>Type:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </p>
                <p>
                  <b>Severity:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[c.status?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartComplaintTable;
