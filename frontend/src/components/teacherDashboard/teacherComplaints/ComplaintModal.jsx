import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next"; // assuming i18n setup

const ComplaintModal = ({ onClose, onSubmit, newComplaint, setNewComplaint, isLoading }) => {
  const { t } = useTranslation("teacherComplaints");

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="text-[#104c80]" size={26} />
          <h3 className="text-xl font-bold text-[#104c80]">
            {t("teacherComplaints.submitModal.title")}
          </h3>
        </div>
        <div className="border-b mb-6"></div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Employee Name + Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.employeeName")}
              </label>
              <input
                type="text"
                value={newComplaint.employeeName}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, employeeName: e.target.value })
                }
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.jobTitle")}
              </label>
              <input
                type="text"
                value={newComplaint.jobTitle}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, jobTitle: e.target.value })
                }
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
                required
              />
            </div>
          </div>

          {/* Department + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.department")}
              </label>
              <input
                type="text"
                value={newComplaint.department}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, department: e.target.value })
                }
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.date")}
              </label>
              <input
                type="date"
                value={newComplaint.date}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, date: e.target.value })
                }
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
                required
              />
            </div>
          </div>

          {/* Complaint Type + Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.type")}
              </label>
              <select
                value={newComplaint.type}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, type: e.target.value })
                }
                required
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
              >
                <option value="">{t("teacherComplaints.submitModal.type")}</option>
                {Object.entries(t("teacherComplaints.submitModal.typeOptions", { returnObjects: true })).map(
                  ([key, label]) => (
                    <option key={key} value={label}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.severity")}
              </label>
              <select
                value={newComplaint.severity}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, severity: e.target.value })
                }
                required
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
              >
                <option value="">{t("teacherComplaints.submitModal.severity")}</option>
                {Object.entries(t("teacherComplaints.submitModal.severityOptions", { returnObjects: true })).map(
                  ([key, label]) => (
                    <option key={key} value={label}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Impact + Expected Action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.impact")}
              </label>
              <select
                value={newComplaint.impact}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, impact: e.target.value })
                }
                required
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
              >
                <option value="">{t("teacherComplaints.submitModal.impact")}</option>
                {Object.entries(t("teacherComplaints.submitModal.impactOptions", { returnObjects: true })).map(
                  ([key, label]) => (
                    <option key={key} value={label}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("teacherComplaints.submitModal.expectedAction")}
              </label>
              <input
                type="text"
                value={newComplaint.expectedAction}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    expectedAction: e.target.value,
                  })
                }
                className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 shadow-inner 
                           focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
                required
              />
            </div>
          </div>

          {/* Complaint Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("teacherComplaints.submitModal.details")}
            </label>
            <textarea
              rows="4"
              value={newComplaint.details}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, details: e.target.value })
              }
              className="w-full rounded-lg px-4 py-2 text-sm border border-gray-300 
                         shadow-inner focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] 
                         outline-none transition resize-none"
              required
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition shadow-sm"
            >
              {t("teacherComplaints.submitModal.cancelButton")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a63] 
                         text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {isLoading ? t("teacherComplaints.submitModal.submittingButton") : t("teacherComplaints.submitModal.submitButton")}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ComplaintModal;
