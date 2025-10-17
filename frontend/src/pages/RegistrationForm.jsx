import { useState } from "react";
import { useCreateRegistrationMutation } from "../redux/slices/RegistrationApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const { t, i18n } = useTranslation("registrationForm");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    child_name: "",
    dob: "",
    age: "",
    id_number: "",
    father_name: "",
    father_mobile: "",
    father_job: "",
    mother_name: "",
    mother_mobile: "",
    mother_job: "",
    home_phone: "",
    nationality: "",
    previous_school: "",
    email: "",
    medical_condition: "no",
    medical_details: "",
    declarer_name: "",
    signature: "",
  });

  const [createRegistration, { isLoading }] = useCreateRegistrationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t("fields.email.label") + " " + t("Please enter a valid email address"));
      return;
    }

    try {
      await createRegistration(formData).unwrap();
      navigate("/");
      toast.success(t("fields.submit") + " " + t("successfully"));

      setFormData({
        child_name: "",
        dob: "",
        age: "",
        id_number: "",
        father_name: "",
        father_mobile: "",
        father_job: "",
        mother_name: "",
        mother_mobile: "",
        mother_job: "",
        home_phone: "",
        nationality: "",
        previous_school: "",
        email: "",
        medical_condition: "no",
        medical_details: "",
        declarer_name: "",
        signature: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || t("fields.submit") + " " + t("failed"));
    }
  };

  return (
    <div
      className="w-full bg-gradient-to-r from-blue-50/50 to-pink-50/50 px-4 sm:px-6 lg:px-8 xl:px-12 py-8"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1c60a3] mb-10">
          {t("title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Child Name */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.child_name.label")}</label>
            <input
              type="text"
              name="child_name"
              value={formData.child_name}
              onChange={handleChange}
              placeholder={t("fields.child_name.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.email.label")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("fields.email.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.dob.label")}</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.age.label")}</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={t("fields.age.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Personal ID Number */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.id_number.label")}</label>
            <input
              type="text"
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
              placeholder={t("fields.id_number.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Father Info */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.father_name.label")}</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              placeholder={t("fields.father_name.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t("fields.father_mobile.label")}</label>
            <input
              type="tel"
              name="father_mobile"
              value={formData.father_mobile}
              onChange={handleChange}
              placeholder={t("fields.father_mobile.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t("fields.father_job.label")}</label>
            <input
              type="text"
              name="father_job"
              value={formData.father_job}
              onChange={handleChange}
              placeholder={t("fields.father_job.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Mother Info */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.mother_name.label")}</label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              placeholder={t("fields.mother_name.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t("fields.mother_mobile.label")}</label>
            <input
              type="tel"
              name="mother_mobile"
              value={formData.mother_mobile}
              onChange={handleChange}
              placeholder={t("fields.mother_mobile.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t("fields.mother_job.label")}</label>
            <input
              type="text"
              name="mother_job"
              value={formData.mother_job}
              onChange={handleChange}
              placeholder={t("fields.mother_job.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Home & Nationality */}
          <div>
            <label className="block font-semibold mb-1">{t("fields.home_phone.label")}</label>
            <input
              type="tel"
              name="home_phone"
              value={formData.home_phone}
              onChange={handleChange}
              placeholder={t("fields.home_phone.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t("fields.nationality.label")}</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder={t("fields.nationality.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Previous School */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">{t("fields.previous_school.label")}</label>
            <input
              type="text"
              name="previous_school"
              value={formData.previous_school}
              onChange={handleChange}
              placeholder={t("fields.previous_school.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
            />
          </div>

          {/* Medical Info */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">{t("fields.medical_condition.label")}</label>
            <select
              name="medical_condition"
              value={formData.medical_condition}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#1c60a3] outline-none"
            >
              <option value="yes">{t("fields.medical_condition.options.yes")}</option>
              <option value="no">{t("fields.medical_condition.options.no")}</option>
            </select>
            <textarea
              name="medical_details"
              value={formData.medical_details}
              onChange={handleChange}
              placeholder={t("fields.medical_details.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
            />
          </div>

          {/* Declaration */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">{t("fields.declarer_name.label")}</label>
            <input
              type="text"
              name="declarer_name"
              value={formData.declarer_name}
              onChange={handleChange}
              placeholder={t("fields.declarer_name.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
            <input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              placeholder={t("fields.signature.placeholder")}
              className="w-full border border-gray-300 p-3 rounded-md mt-3 focus:ring-2 focus:ring-[#1c60a3] outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#224182] to-[#3b63bb] hover:opacity-90 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? t("fields.submitting") : t("fields.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
