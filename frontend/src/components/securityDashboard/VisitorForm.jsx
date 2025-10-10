import { useState } from "react";
import {
  User,
  IdCard,
  Mail,
  ClipboardList,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { useAddVisitorMutation } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";

const VisitorForm = ({ onClose }) => {
  const { t } = useTranslation("securityVisitorForm");

  const [form, setForm] = useState({
    name: "",
    governmentId: "",
    visitorType: "parent", // ✅ new field
    reason: "meeting",
    hostEmail: "",
  });

  const [addVisitor, { isLoading }] = useAddVisitorMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.governmentId) {
      return alert(t("visitorForm.alerts.missingFields"));
    }
    try {
      await addVisitor(form).unwrap();
      onClose();
    } catch (err) {
      console.error("Add visitor failed:", err);
      alert(t("visitorForm.alerts.failed"));
    }
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#104c80]">
          {t("visitorForm.title")}
        </h2>
        <p className="text-sm text-slate-500">{t("visitorForm.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User size={16} className="text-[#104c80]" />{" "}
            {t("visitorForm.fields.name.label")}
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder={t("visitorForm.fields.name.placeholder")}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        {/* Government ID */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <IdCard size={16} className="text-[#104c80]" />{" "}
            {t("visitorForm.fields.governmentId.label")}
          </label>
          <input
            value={form.governmentId}
            onChange={(e) =>
              setForm({ ...form, governmentId: e.target.value })
            }
            required
            placeholder={t("visitorForm.fields.governmentId.placeholder")}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        {/* Visitor Type ✅ */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <UserCheck size={16} className="text-[#104c80]" />{" "}
            {t("visitorForm.fields.visitorType.label")}
          </label>
          <select
            value={form.visitorType}
            onChange={(e) => setForm({ ...form, visitorType: e.target.value })}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          >
            <option value="parent">
              {t("visitorForm.fields.visitorType.options.parent")}
            </option>
            <option value="teacher">
              {t("visitorForm.fields.visitorType.options.teacher")}
            </option>
            <option value="student">
              {t("visitorForm.fields.visitorType.options.student")}
            </option>
            <option value="other">
              {t("visitorForm.fields.visitorType.options.other")}
            </option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <ClipboardList size={16} className="text-[#104c80]" />{" "}
            {t("visitorForm.fields.reason.label")}
          </label>
          <select
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          >
            <option value="meeting">
              {t("visitorForm.fields.reason.options.meeting")}
            </option>
            <option value="interview">
              {t("visitorForm.fields.reason.options.interview")}
            </option>
            <option value="delivery">
              {t("visitorForm.fields.reason.options.delivery")}
            </option>
            <option value="maintenance">
              {t("visitorForm.fields.reason.options.maintenance")}
            </option>
            <option value="other">
              {t("visitorForm.fields.reason.options.other")}
            </option>
          </select>
        </div>

        {/* Host Email */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail size={16} className="text-[#104c80]" />{" "}
            {t("visitorForm.fields.hostEmail.label")}
          </label>
          <input
            value={form.hostEmail}
            onChange={(e) =>
              setForm({ ...form, hostEmail: e.target.value })
            }
            placeholder={t("visitorForm.fields.hostEmail.placeholder")}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a62] text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
        >
          <CheckCircle2 size={20} />{" "}
          {isLoading
            ? t("visitorForm.button.submitting")
            : t("visitorForm.button.submit")}
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;
