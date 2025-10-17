import { useState } from "react";
import {
  User,
  IdCard,
  ClipboardList,
  CheckCircle2,
  UserCheck,
  Phone,
  Mail,
  Building2,
  FileSignature,
} from "lucide-react";
import { useAddVisitorMutation } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const VisitorForm = ({ onClose }) => {
  const { t, i18n } = useTranslation("securityVisitorForm");

  const [form, setForm] = useState({
    name: "",
    governmentId: "",
    phone: "",
    email: "",
    visitorType: "parent",
    reason: "parentMeeting",
    hostDepartment: "",
    agreeRules: false,
    signature: "",
  });

  const [addVisitor, { isLoading }] = useAddVisitorMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.governmentId || !form.phone || !form.email) {
      return alert(t("visitorForm.alerts.missingFields"));
    }
    if (!form.agreeRules) {
      return alert(t("visitorForm.alerts.mustAgree"));
    }

    try {
      await addVisitor(form).unwrap();
      toast.success("Your visitor request has been submitted.");
      onClose();
    } catch (err) {
      console.error("Add visitor failed:", err);
      toast.error(
        err?.data?.message || t("visitorForm.alerts.submissionError")
      );
    }
  }

  return (
    <div
      className="p-6 max-w-8xl mx-auto h-[650px] md:h-[590px]"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#104c80]">
          {t("visitorForm.title")}
        </h2>
        <p className="text-sm text-slate-500">{t("visitorForm.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row - Name & ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.name.label")}
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("visitorForm.fields.name.placeholder")}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Government ID */}
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <IdCard size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.governmentId.label")}
            </label>
            <input
              value={form.governmentId}
              onChange={(e) =>
                setForm({ ...form, governmentId: e.target.value })
              }
              placeholder={t("visitorForm.fields.governmentId.placeholder")}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Second Row - Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Phone size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.phone.label")}
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder={t("visitorForm.fields.phone.placeholder")}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.email.label", "Email")}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t(
                "visitorForm.fields.email.placeholder",
                "Enter your email"
              )}
              required
              className="mt-2 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Third Row - Visitor Type & Reason */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visitor Type */}
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <UserCheck size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.visitorType.label")}
            </label>
            <select
              value={form.visitorType}
              onChange={(e) =>
                setForm({ ...form, visitorType: e.target.value })
              }
              className="mt-2 w-full border rounded-lg px-3 py-2"
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
              <ClipboardList size={16} className="text-[#104c80]" />
              {t("visitorForm.fields.reason.label")}
            </label>
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="mt-2 w-full border rounded-lg px-3 py-2"
            >
              <option value="parentMeeting">
                {t("visitorForm.fields.reason.options.parentMeeting")}
              </option>
              <option value="teacherMeeting">
                {t("visitorForm.fields.reason.options.teacherMeeting")}
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
        </div>

        {/* Fourth Row - Host Department */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
            <Building2 size={16} className="text-[#104c80]" />
            {t("visitorForm.fields.hostDepartment.label")}
          </label>
          <input
            value={form.hostDepartment}
            onChange={(e) =>
              setForm({ ...form, hostDepartment: e.target.value })
            }
            placeholder={t("visitorForm.fields.hostDepartment.placeholder")}
            className="mt-2 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Signature */}
        <div className="mt-4">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <FileSignature size={16} className="text-[#104c80]" />
            {t("visitorForm.fields.signature.label")}
          </label>
          <input
            value={form.signature}
            onChange={(e) => setForm({ ...form, signature: e.target.value })}
            placeholder={t("visitorForm.fields.signature.placeholder")}
            className="mt-2 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Agreement */}
        <div className="mt-4 flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <input
            type="checkbox"
            checked={form.agreeRules}
            onChange={(e) => setForm({ ...form, agreeRules: e.target.checked })}
            className="w-4 h-4 accent-[#104c80]"
          />
          <label className="text-sm text-slate-700">
            {t("visitorForm.fields.agreeRules.label")}
          </label>
        </div>

        {/* Thank You Note */}
        <p className="text-sm md:text-[15px] text-green-600 mt-2 text-center">
          {t("visitorForm.note")}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-6 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a62] text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
        >
          <CheckCircle2 size={20} />
          {isLoading
            ? t("visitorForm.button.submitting")
            : t("visitorForm.button.submit")}
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;
