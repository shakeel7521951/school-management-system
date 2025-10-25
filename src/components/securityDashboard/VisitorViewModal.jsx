import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisitorViewModal = ({ visitor, onClose }) => {
  const { t } = useTranslation("visitorViewModal"); // 👈 use your JSON namespace

  if (!visitor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t("buttons.close")}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Visitor Details */}
        <h2 className="text-xl font-bold text-[#104c80] mb-4">
          {t("title")}
        </h2>
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-medium">{t("fields.name")}:</span> {visitor.name}
          </p>
          <p>
            <span className="font-medium">{t("fields.badge")}:</span> {visitor.governmentId}
          </p>
          <p>
            <span className="font-medium">{t("fields.reason")}:</span> {visitor.reason}
          </p>
          <p>
            <span className="font-medium">{t("fields.host")}:</span> {visitor.hostEmail}
          </p>
          <p>
            <span className="font-medium">{t("fields.checkin")}:</span>{" "}
            {new Date(visitor.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">{t("fields.status")}:</span>{" "}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                visitor.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : visitor.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {t(`status.${visitor.status}`)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
