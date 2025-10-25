import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisitorViewModal = ({ visitor, onClose }) => {
  const { t } = useTranslation("receptionistViewModal");

  if (!visitor) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* --- Modal Title --- */}
        <h2 className="text-lg font-bold text-[#104c80] mb-5 text-center">
          {t("visitorViewModal.title")}
        </h2>

        {/* --- Visitor Information --- */}
        <div className="space-y-3 text-sm">
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.fullName")}:</span>{" "}
            {visitor.name || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.idOrPassport")}:</span>{" "}
            {visitor.governmentId || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.phone")}:</span>{" "}
            {visitor.phone || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.purpose")}:</span>{" "}
            {visitor.reason || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.department")}:</span>{" "}
            {visitor.hostDepartment || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.signature")}:</span>{" "}
            {visitor.signature || t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.submittedOn")}:</span>{" "}
            {visitor.createdAt ? new Date(visitor.createdAt).toLocaleString() : t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.updatedOn")}:</span>{" "}
            {visitor.updatedAt ? new Date(visitor.updatedAt).toLocaleString() : t("visitorViewModal.fallback.empty")}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorViewModal.labels.status")}:</span>{" "}
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                visitor.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : visitor.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {visitor.status ? t(`visitorViewModal.status.${visitor.status}`) : t("visitorViewModal.fallback.empty")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
