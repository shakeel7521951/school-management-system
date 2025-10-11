import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateParentComplaintMutation } from "../redux/slices/ParentComplaintApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ParentComplaintForm = () => {
  const { t,i18n } = useTranslation("parentComplaintForm");
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    parentName: "",
    relationToStudent: "",
    studentName: "",
    class: "",
    date: "",
    complaintType: "",
    severity: "",
    details: "",
    impact: "",
    expectedAction: "",
  });

  const [createParentComplaint, { isLoading }] = useCreateParentComplaintMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createParentComplaint(formData).unwrap();
      toast.success(t("parentComplaintForm.toast.success"), {
        position: "top-right",
        theme: "colored",
      });
      navigate(-1);
      setFormData({
        parentName: "",
        relationToStudent: "",
        studentName: "",
        class: "",
        date: "",
        complaintType: "",
        severity: "",
        details: "",
        impact: "",
        expectedAction: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(error?.data?.message || t("parentComplaintForm.toast.error"), {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4"  
    dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 border-t-4 border-[#104c80]">
        <h2 className="text-3xl font-bold text-[#104c80] mb-6 text-center">
          {t("parentComplaintForm.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Parent Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.parentName")}
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                placeholder={t("parentComplaintForm.parentName")}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.relationToStudent")}
              </label>
              <input
                type="text"
                name="relationToStudent"
                value={formData.relationToStudent}
                onChange={handleChange}
                required
                placeholder={t("parentComplaintForm.relationToStudent")}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>
          </div>

          {/* Student Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.studentName")}
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                placeholder={t("parentComplaintForm.studentName")}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.class")}
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                placeholder={t("parentComplaintForm.class")}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>
          </div>

          {/* Complaint Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.date")}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.complaintType.label")}
              </label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">{t("parentComplaintForm.complaintType.placeholder")}</option>
                <option value="Safety">{t("parentComplaintForm.complaintType.options.safety")}</option>
                <option value="Wellbeing">{t("parentComplaintForm.complaintType.options.wellbeing")}</option>
                <option value="Bullying">{t("parentComplaintForm.complaintType.options.bullying")}</option>
                <option value="Staff">{t("parentComplaintForm.complaintType.options.staff")}</option>
                <option value="Education">{t("parentComplaintForm.complaintType.options.education")}</option>
                <option value="Facilities">{t("parentComplaintForm.complaintType.options.facilities")}</option>
                <option value="Bus">{t("parentComplaintForm.complaintType.options.bus")}</option>
                <option value="Rights">{t("parentComplaintForm.complaintType.options.rights")}</option>
                <option value="Other">{t("parentComplaintForm.complaintType.options.other")}</option>
              </select>
            </div>
          </div>

          {/* Impact and Severity */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.impact.label")}
              </label>
              <select
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">{t("parentComplaintForm.impact.placeholder")}</option>
                <option value="Psychological">{t("parentComplaintForm.impact.options.psychological")}</option>
                <option value="Physical">{t("parentComplaintForm.impact.options.physical")}</option>
                <option value="Academic">{t("parentComplaintForm.impact.options.academic")}</option>
                <option value="Social">{t("parentComplaintForm.impact.options.social")}</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t("parentComplaintForm.severity.label")}
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">{t("parentComplaintForm.severity.placeholder")}</option>
                <option value="Simple Note">{t("parentComplaintForm.severity.options.simpleNote")}</option>
                <option value="Urgent">{t("parentComplaintForm.severity.options.urgent")}</option>
                <option value="Follow-up">{t("parentComplaintForm.severity.options.followUp")}</option>
                <option value="Serious">{t("parentComplaintForm.severity.options.serious")}</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("parentComplaintForm.details.label")}
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows="4"
              placeholder={t("parentComplaintForm.details.placeholder")}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
            ></textarea>
          </div>

          {/* Expected Action */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("parentComplaintForm.expectedAction.label")}
            </label>
            <textarea
              name="expectedAction"
              value={formData.expectedAction}
              onChange={handleChange}
              rows="3"
              placeholder={t("parentComplaintForm.expectedAction.placeholder")}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-400" : "bg-[#104c80] hover:bg-[#0d3a63]"
              } text-white font-semibold py-3 px-10 rounded-xl transition duration-300`}
            >
              {isLoading
                ? t("parentComplaintForm.submitButton.loading")
                : t("parentComplaintForm.submitButton.default")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentComplaintForm;
