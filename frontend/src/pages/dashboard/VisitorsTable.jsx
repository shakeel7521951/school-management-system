import React from "react";
import { useGetVisitorsQuery } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";

const VisitorTable = () => {
  const { t } = useTranslation("adminVisitorsApplications");
  const { data: visitors = [], isLoading, isError } = useGetVisitorsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#104c80]">
        <p className="font-semibold text-lg">{t("loading")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold text-lg">
        {t("error")}
      </div>
    );
  }

  return (
    <div className="p-6 lg:ml-64 min-h-screen bg-gradient-to-br from-[#f5f9ff] to-[#e4edf6]">
      {/* Header Section */}
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl font-bold text-[#104c80] mb-1">{t("title")}</h1>
        <p className="text-gray-500 text-sm">{t("subtitle")}</p>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-200">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#104c80] text-white text-xs uppercase tracking-wide select-none">
              {[
                "number",
                "fullName",
                "visitorType",
                "idOrPassport",
                "phoneNumber",
                "purpose",
                "department",
                "signature",
                "submittedOn",
                "status",
              ].map((key) => (
                <th
                  key={key}
                  className="px-5 py-4 whitespace-nowrap text-center font-semibold border-r border-[#0f4370]/30 last:border-none"
                >
                  {t(`headers.${key}`)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visitors.length > 0 ? (
              visitors.map((v, index) => (
                <tr
                  key={v._id}
                  className={`transition-all duration-200 border-b border-slate-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-[#eff6ff]`}
                >
                  <td className="px-5 py-4 text-center font-semibold text-[#104c80]">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {v.name || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap capitalize">
                    {v.visitorType || "—"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {v.governmentId || v.passport || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {v.phone || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap text-center">
                    {v.reason || v.purpose || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap text-center">
                    {v.hostDepartment || v.personToVisit || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {v.signature || "—"}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {v.createdAt ? new Date(v.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        v.status === "approved"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : v.status === "rejected"
                          ? "bg-red-100 text-red-700 border border-red-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {v.status ? t(`status.${v.status}`) : t("status.pending")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-12 text-gray-500 font-medium"
                >
                  {t("noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {visitors.length > 0 ? (
          visitors.map((v, index) => (
            <div
              key={v._id}
              className="bg-white shadow-md rounded-2xl border border-slate-200 p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-[#104c80]">
                  {index + 1}. {v.name || t("mobile.unknownVisitor")}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    v.status === "approved"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : v.status === "rejected"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  }`}
                >
                  {v.status ? t(`status.${v.status}`) : t("status.pending")}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>{t("mobile.visitorType")}:</strong> {v.visitorType || "—"}
                </p>
                <p>
                  <strong>{t("mobile.idOrPassport")}:</strong>{" "}
                  {v.governmentId || v.passport || "-"}
                </p>
                <p>
                  <strong>{t("mobile.phone")}:</strong> {v.phone || "-"}
                </p>
                <p>
                  <strong>{t("mobile.purpose")}:</strong> {v.reason || v.purpose || "-"}
                </p>
                <p>
                  <strong>{t("mobile.department")}:</strong>{" "}
                  {v.hostDepartment || v.personToVisit || "-"}
                </p>
                <p>
                  <strong>{t("mobile.signature")}:</strong> {v.signature || "—"}
                </p>
                <p className="text-gray-500 text-xs">
                  <strong>{t("mobile.submittedOn")}:</strong>{" "}
                  {v.createdAt ? new Date(v.createdAt).toLocaleString() : "-"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-12 text-gray-500 font-medium">{t("noData")}</p>
        )}
      </div>
    </div>
  );
};

export default VisitorTable;
