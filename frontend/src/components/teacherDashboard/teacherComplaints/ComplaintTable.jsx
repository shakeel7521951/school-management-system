import React from "react";
import { useTranslation } from "react-i18next";

const ComplaintTable = ({ complaints }) => {
  const { t } = useTranslation("teacherComplaints");

  const statusStyles = t("teacherComplaints.table.statusStyles", { returnObjects: true });
  const severityStyles = t("teacherComplaints.table.severityStyles", { returnObjects: true });
  const headers = t("teacherComplaints.table.headers", { returnObjects: true });
  const mobileHeaders = t("teacherComplaints.table.mobileCard", { returnObjects: true });
  const statusLabels = t("teacherComplaints.table.status", { returnObjects: true });

  const headerOrder = [
    { key: "employeeName", label: headers.employeeName },
    { key: "jobTitle", label: headers.jobTitle },
    { key: "department", label: headers.department },
    { key: "date", label: headers.date },
    { key: "type", label: headers.type },
    { key: "severity", label: headers.severity },
    { key: "impact", label: headers.impact },
    { key: "details", label: headers.details },
    { key: "expectedAction", label: headers.expectedAction },
    { key: "status", label: headers.status },
  ];

  return (
    <div>
      {/* ✅ Desktop Table */}
      <div className="hidden md:block bg-white shadow-lg rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border border-gray-300 text-sm table-fixed">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
              <tr>
                {headerOrder.map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-xs font-extrabold uppercase tracking-wider border border-gray-300"
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 font-medium text-gray-900 border border-gray-300">
                    {complaint.employeeName}
                  </td>
                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.jobTitle}
                  </td>
                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.department}
                  </td>
                  <td className="px-3 py-3 text-gray-500 border border-gray-300">
                    {complaint.date
                      ? new Date(complaint.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-3 border border-gray-300">
                    {complaint.type}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold 
                        ${severityStyles[complaint.severity]?.bg || ""} 
                        ${severityStyles[complaint.severity]?.text || ""}`}
                    >
                      {complaint.severity}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-300">
                    {complaint.impact}
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-300">
                    {complaint.details}
                  </td>
                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.expectedAction}
                  </td>
                  <td className="px-3 py-3 border border-gray-300">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border 
                        ${statusStyles[complaint.status]?.bg || ""} 
                        ${statusStyles[complaint.status]?.text || ""} 
                        ${statusStyles[complaint.status]?.border || ""}`}
                    >
                      {statusLabels[complaint.status] || complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Mobile Card */}
      <div className="md:hidden space-y-4">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl border border-gray-200 p-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">
                  {complaint.employeeName}
                </h4>
                <p className="text-xs text-gray-500">
                  {complaint.jobTitle} • {complaint.department}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border 
                  ${statusStyles[complaint.status]?.bg || ""} 
                  ${statusStyles[complaint.status]?.text || ""} 
                  ${statusStyles[complaint.status]?.border || ""}`}
              >
                {statusLabels[complaint.status] || complaint.status}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">{mobileHeaders.date}</span>{" "}
                {complaint.date
                  ? new Date(complaint.date).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <span className="font-semibold">{mobileHeaders.type}</span>{" "}
                {complaint.type}
              </p>
              <p>
                <span className="font-semibold">{mobileHeaders.severity}</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold 
                    ${severityStyles[complaint.severity]?.bg || ""} 
                    ${severityStyles[complaint.severity]?.text || ""}`}
                >
                  {complaint.severity}
                </span>
              </p>
              <p>
                <span className="font-semibold">{mobileHeaders.impact}</span>{" "}
                {complaint.impact}
              </p>
              <p>
                <span className="font-semibold">{mobileHeaders.details}</span>{" "}
                {complaint.details}
              </p>
              <p>
                <span className="font-semibold">
                  {mobileHeaders.expectedAction}
                </span>{" "}
                {complaint.expectedAction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintTable;
