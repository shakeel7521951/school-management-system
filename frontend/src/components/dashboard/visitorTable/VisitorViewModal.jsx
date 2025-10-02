import { X, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisitorViewModal = ({ visitor, onClose, onApprove, onReject }) => {
  if (!visitor) return null;

  const { t } = useTranslation("adminVisitorData");

  const statusLabels = t("tableSection.statusOptions", { returnObjects: true }) || {};

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-[#104c80] mb-5 text-center">
          {t("visitorModal.title")}
        </h2>

        <div className="space-y-3 text-sm">
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.name")}:</span>{" "}
            {visitor.name}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.hostEmail")}:</span>{" "}
            {visitor.hostEmail}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.governmentId")}:</span>{" "}
            {visitor.governmentId}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.reason")}:</span>{" "}
            {visitor.reason}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.createdAt")}:</span>{" "}
            {new Date(visitor.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.updatedAt")}:</span>{" "}
            {new Date(visitor.updatedAt).toLocaleString()}
          </p>
          <p>
            <span className="font-bold text-slate-700">{t("visitorModal.fields.status")}:</span>{" "}
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                visitor.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : visitor.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {statusLabels[visitor.status] || visitor.status}
            </span>
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => onApprove(visitor._id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium"
          >
            <CheckCircle size={14} /> {t("visitorModal.buttons.approve")}
          </button>
          <button
            onClick={() => onReject(visitor._id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
          >
            <XCircle size={14} /> {t("visitorModal.buttons.reject")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
