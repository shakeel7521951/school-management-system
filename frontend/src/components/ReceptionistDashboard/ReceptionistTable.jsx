import { Eye, Edit3, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReceptionistTable = ({ visitors, onView, onEdit, onDelete }) => {
  const { t } = useTranslation("receptionistTable");

  return (
    <>
      {/* --- TABLE (Laptop & Tablet) --- */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-x-auto border border-slate-200">
        <table className="w-full text-sm text-left table-auto whitespace-nowrap">
          <thead className="bg-[#104c80] text-[#eef3f9] uppercase text-xs font-semibold">
            <tr>
              <th className="px-5 py-3 text-center">{t("receptionistTable.table.number")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.fullName")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.idOrPassport")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.phoneNumber")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.visitorType")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.purpose")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.department")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.signature")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.submittedOn")}</th>
              <th className="px-5 py-3">{t("receptionistTable.table.status")}</th>
              <th className="px-5 py-3 text-center">{t("receptionistTable.table.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((v, i) => (
              <tr
                key={v._id}
                className={`border-t ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-[#f1f7ff] transition-all`}
              >
                <td className="px-5 py-3 text-center font-medium text-[#104c80]">{i + 1}</td>
                <td className="px-5 py-3">{v.name}</td>
                <td className="px-5 py-3">{v.governmentId}</td>
                <td className="px-5 py-3">{v.phone}</td>
                <td className="px-5 py-3 capitalize text-center">{v.visitorType}</td>
                <td className="px-5 py-3 text-center">{v.reason}</td>
                <td className="px-5 py-3 text-center">{v.hostDepartment}</td>
                <td className="px-5 py-3">{v.signature || t("fallback.noSignature")}</td>
                <td className="px-5 py-3">{new Date(v.createdAt).toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      v.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : v.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {t(`receptionistTable.status.${v.status}`)}
                  </span>
                </td>

                <td className="px-5 py-3 flex gap-2 justify-center">
                  <button onClick={() => onView(v)} className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Eye size={16} title={t("receptionistTable.actions.view")} />
                  </button>
                  <button onClick={() => onEdit(v)} className="p-2 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100">
                    <Edit3 size={16} title={t("receptionistTable.actions.edit")} />
                  </button>
                  <button onClick={() => onDelete(v)} className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                    <Trash2 size={16} title={t("receptionistTable.actions.delete")} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW --- */}
      <div className="block md:hidden space-y-4">
        {visitors.map((v, i) => (
          <div key={v._id} className="bg-white shadow-md rounded-2xl p-5 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-[#104c80]">{v.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  v.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : v.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {t(`status.${v.status}`)}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              <strong>{t("mobile.idOrPassport")}:</strong> {v.governmentId}
            </p>
            <p className="text-sm text-gray-700">
              <strong>{t("mobile.phone")}:</strong> {v.phone}
            </p>
            <p className="text-sm text-gray-700 capitalize">
              <strong>{t("mobile.visitorType")}:</strong> {v.visitorType}
            </p>
            <p className="text-sm text-gray-700">
              <strong>{t("mobile.purpose")}:</strong> {v.reason}
            </p>
            <p className="text-sm text-gray-700">
              <strong>{t("mobile.department")}:</strong> {v.hostDepartment}
            </p>
            <p className="text-sm text-gray-700">
              <strong>{t("mobile.submittedOn")}:</strong> {new Date(v.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => onView(v)} className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                <Eye size={16} title={t("receptionistTable.actions.view")} />
              </button>
              <button onClick={() => onEdit(v)} className="p-2 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100">
                <Edit3 size={16} title={t("receptionistTable.actions.edit")} />
              </button>
              <button onClick={() => onDelete(v)} className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                <Trash2 size={16} title={t("receptionistTable.actions.delete")} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReceptionistTable;
