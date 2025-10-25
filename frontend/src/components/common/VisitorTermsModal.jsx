import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisitorTermsModal = ({ open, onClose }) => {
  const { t, i18n } = useTranslation("visitorTermsModal");

  if (!open) return null;

  // Detect current direction (LTR for English, RTL for Arabic)
  const direction = i18n.dir();
  const guidelines = t("guidelines", { returnObjects: true });

  return ReactDOM.createPortal(
    <div
      dir={direction}
      className="fixed inset-0 z-[9991] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        className={`relative bg-white w-full max-w-2xl mx-4 sm:mx-auto rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn ${
          direction === "rtl" ? "text-right" : "text-left"
        }`}
      >
        {/* --- Header --- */}
        <div
          className={`flex items-center justify-between bg-gradient-to-r from-[#0d3a62] to-[#104c80] px-6 py-4 ${
            direction === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* --- Body Content --- */}
        <div className="p-6 sm:p-8 text-gray-800 overflow-y-auto max-h-[70vh] leading-relaxed">
          <p className="mb-4 text-[15px] text-gray-700">{t("intro")}</p>

          <ul
            className={`list-disc ${
              direction === "rtl" ? "pr-6" : "pl-6"
            } space-y-3 text-[15px] text-gray-700`}
          >
            {Object.keys(guidelines).map((key) => (
              <li key={key}>{guidelines[key]}</li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-gray-600 italic border-t border-gray-200 pt-4">
            {t("note")}
          </p>
        </div>

        {/* --- Footer / Confirm Button --- */}
        <div
          className={`flex border-t bg-gray-50 px-6 py-4 ${
            direction === "rtl" ? "justify-start" : "justify-end"
          }`}
        >
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#104c80] text-white rounded-lg font-medium hover:bg-[#0d3a62] transition shadow-sm"
          >
            {t("button")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VisitorTermsModal;
