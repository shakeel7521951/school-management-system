import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useCreateStComplaintMutation } from "../../../redux/slices/StComplaintApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ComplaintModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation("studentComplaintModal"); // ✅ matches your JSON filename/key
  const [form, setForm] = useState({
    name: "",
    studentClass: "",
    age: "",
    date: "",
    type: "",
    severity: "",
    details: "",
    impact: "",
    action: "",
  });
  const [error, setError] = useState("");

  const [createComplaint, { isLoading }] = useCreateStComplaintMutation();

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        studentClass: "",
        age: "",
        date: "",
        type: "",
        severity: "",
        details: "",
        impact: "",
        action: "",
      });
      setError("");
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateComplaintId = () => {
    const timestamp = Date.now().toString().slice(-5);
    return `CMP-${new Date().getFullYear()}-${timestamp}`;
  };

  const handleSubmit = async () => {
    const { name, studentClass, date, type, severity, details, impact } = form;
    if (!name || !studentClass || !date || !type || !severity || !details || !impact) {
      setError(t("complaintModal.errorRequired"));
      return;
    }

    try {
      const newComplaint = {
        complaintId: generateComplaintId(),
        ...form,
        status: "Pending",
      };

      const response = await createComplaint(newComplaint).unwrap();
      toast.success(response.message || t("complaintModal.successMessage"));
      onClose();
    } catch (err) {
      console.error("Error submitting complaint:", err);
      toast.error(err?.data?.message || t("complaintModal.errorMessage"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 w-full sm:w-[90%] md:w-[80%] lg:max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#14528B] mb-4 flex items-center gap-2">
          <AlertTriangle size={20} /> {t("complaintModal.title")}
        </h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.name")}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            />
          </div>

          {/* Class */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.class")}</label>
            <input
              type="text"
              value={form.studentClass}
              onChange={(e) => handleChange("studentClass", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            />
          </div>

          {/* Age */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.age")}</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.date")}</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.type")}</label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            >
              <option value="">{t("complaintModal.options.select")}</option>
              <option>{t("complaintModal.options.types.physicalSafety")}</option>
              <option>{t("complaintModal.options.types.emotions")}</option>
              <option>{t("complaintModal.options.types.bullying")}</option>
              <option>{t("complaintModal.options.types.staff")}</option>
              <option>{t("complaintModal.options.types.learning")}</option>
              <option>{t("complaintModal.options.types.facilities")}</option>
              <option>{t("complaintModal.options.types.bus")}</option>
              <option>{t("complaintModal.options.types.rights")}</option>
              <option>{t("complaintModal.options.types.other")}</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.severity")}</label>
            <select
              value={form.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            >
              <option value="">{t("complaintModal.options.select")}</option>
              <option>{t("complaintModal.options.severity.simpleNote")}</option>
              <option>{t("complaintModal.options.severity.urgent")}</option>
              <option>{t("complaintModal.options.severity.followUp")}</option>
              <option>{t("complaintModal.options.severity.serious")}</option>
            </select>
          </div>

          {/* Impact */}
          <div>
            <label className="font-semibold">{t("complaintModal.fields.impact")}</label>
            <select
              value={form.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-1"
            >
              <option value="">{t("complaintModal.options.select")}</option>
              <option>{t("complaintModal.options.impact.psychological")}</option>
              <option>{t("complaintModal.options.impact.physical")}</option>
              <option>{t("complaintModal.options.impact.academic")}</option>
              <option>{t("complaintModal.options.impact.social")}</option>
            </select>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="mt-4">
          <label className="font-semibold">{t("complaintModal.fields.details")}</label>
          <textarea
            value={form.details}
            onChange={(e) => handleChange("details", e.target.value)}
            rows="3"
            className="border border-gray-300 rounded p-2 w-full mt-1"
          />
        </div>

        {/* Expected Action */}
        <div className="mt-4">
          <label className="font-semibold">{t("complaintModal.fields.action")}</label>
          <textarea
            value={form.action}
            onChange={(e) => handleChange("action", e.target.value)}
            rows="2"
            className="border border-gray-300 rounded p-2 w-full mt-1"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-l from-[#14528B] via-[#68f5ba] to-[#14528B] text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isLoading ? t("complaintModal.buttons.submitting") : t("complaintModal.buttons.submit")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {t("complaintModal.buttons.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
