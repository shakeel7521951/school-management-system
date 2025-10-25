import { Eye, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap = {
  Eye,
  CheckCircle,
  XCircle,
};

const PlanningDocumentsTable = ({
  uploads,
  setSelectedDoc,
  setShowViewModal,
  setShowRejectModal,
  handleApprove,
  getStatusClass,
}) => {
  const { t } = useTranslation("adminDocumentsTable"); // JSON namespace

  const tableColumns = t("table.columns", { returnObjects: true });
  const headerStyles = t("table.headerStyles", { returnObjects: true });
  const mobileFields = t("mobileCard.fields", { returnObjects: true });
  const mobileActions = t("mobileCard.actions", { returnObjects: true });

  // Format exact date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                backgroundColor: headerStyles.bgColor,
                color: headerStyles.textColor,
                fontWeight: headerStyles.fontWeight,
                fontSize: headerStyles.fontSize,
              }}
            >
              {tableColumns.map((col) => (
                <th key={col.key} className={`px-4 py-3 text-${col.align}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {uploads.map((doc, i) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                {tableColumns.map((col) => {
                  switch (col.key) {
                    case "index":
                      return (
                        <td key={col.key} className="px-4 py-3 text-sm">
                          {i + 1}
                        </td>
                      );
                    case "status":
                      return (
                        <td key={col.key} className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                              doc.status
                            )}`}
                          >
                            {doc.status}
                          </span>
                        </td>
                      );
                    case "date":
                      return (
                        <td key={col.key} className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(doc.date)}
                        </td>
                      );
                    case "actions":
                      return (
                        <td key={col.key} className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            {mobileActions.map((action) => {
                              const Icon = iconMap[action.icon];
                              return (
                                <button
                                  key={action.key}
                                  onClick={() => {
                                    if (action.key === "view") {
                                      setSelectedDoc(doc);
                                      setShowViewModal(true);
                                    }
                                    if (action.key === "approve") {
                                      handleApprove(doc.id);
                                    }
                                    if (action.key === "reject") {
                                      setSelectedDoc(doc);
                                      setShowRejectModal(true);
                                    }
                                  }}
                                  className={`p-2 text-${action.color}-600 hover:text-${action.hoverColor} hover:bg-gray-100 rounded-md`}
                                  title={action.tooltip}
                                >
                                  <Icon size={16} />
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      );
                    default:
                      return (
                        <td key={col.key} className="px-4 py-3 text-sm text-gray-600">
                          {doc[col.key]}
                        </td>
                      );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden divide-y divide-gray-200">
        {uploads.map((doc) => (
          <div key={doc.id} className="p-4 flex flex-col gap-3 bg-white">
            {mobileFields.map((field) => (
              <p key={field.key} className="text-sm text-gray-600">
                {field.label && <span className="font-medium">{field.label}: </span>}
                {field.key === "status" ? (
                  <span
                    className={`inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                ) : field.key === "date" ? (
                  <span>{formatDate(doc.date)}</span>
                ) : field.key === "title" ? (
                  <span className={`font-${field.fontWeight} text-${field.fontSize}`}>
                    {doc.title}
                  </span>
                ) : (
                  doc[field.key]
                )}
              </p>
            ))}

            <div className="flex justify-end gap-3 pt-2">
              {mobileActions.map((action) => {
                const Icon = iconMap[action.icon];
                return (
                  <button
                    key={action.key}
                    onClick={() => {
                      if (action.key === "view") {
                        setSelectedDoc(doc);
                        setShowViewModal(true);
                      }
                      if (action.key === "approve") {
                        handleApprove(doc.id);
                      }
                      if (action.key === "reject") {
                        setSelectedDoc(doc);
                        setShowRejectModal(true);
                      }
                    }}
                    className={`p-2 text-${action.color}-600 hover:text-${action.hoverColor} hover:bg-gray-100 rounded-md`}
                    title={action.tooltip}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningDocumentsTable;
