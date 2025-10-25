import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_0qabf0m", "template_ksnjrpa", form.current, {
        publicKey: "ZkkXKoa_K5Yh1CDJJ",
      })
      .then(() => {
        toast.success(t("formSection.successMessage"));
        setFormData({
          user_name: "",
          user_email: "",
          user_phone: "",
          message: "",
        });
      })
      .catch((error) =>
        toast.error(t("formSection.errorMessage") + error.text)
      );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const flipVariant = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] relative overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl tracking-wide">
            {t("heroSection.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {t("heroSection.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Secondary Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center my-14 px-4 py-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#104c80]">
          {t("secondaryHeading.title")}
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {t("secondaryHeading.description")}
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Address */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/address.png"
                alt={t("contactCards.address.iconAlt")}
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              {t("contactCards.address.title")}
            </h4>
            <p className="text-gray-700">{t("contactCards.address.details")}</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/smartphone.png"
                alt={t("contactCards.phone.iconAlt")}
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              {t("contactCards.phone.title")}
            </h4>
            <p className="text-gray-700">{t("contactCards.phone.details")}</p>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/open-email.png"
                alt={t("contactCards.email.iconAlt")}
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              {t("contactCards.email.title")}
            </h4>
            <p className="text-gray-700">{t("contactCards.email.details")}</p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto mb-20"
      >
        <form ref={form} className="space-y-6" onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-800 text-sm md:text-base">
                {t("formSection.fields.fullName.label")}
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder={t("formSection.fields.fullName.placeholder")}
                required
                className="w-full mt-1 px-4 py-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-800 text-sm md:text-base">
                {t("formSection.fields.email.label")}
              </label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder={t("formSection.fields.email.placeholder")}
                required
                className="w-full mt-1 px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-800 text-sm md:text-base">
              {t("formSection.fields.phone.label")}
            </label>
            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder={t("formSection.fields.phone.placeholder")}
              className="w-full mt-1 px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800 text-sm md:text-base">
              {t("formSection.fields.message.label")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("formSection.fields.message.placeholder")}
              required
              rows="6"
              className="w-full mt-1 px-4 py-3 border rounded-lg"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#1a4480] to-[#153567] text-[#facc15] py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            {t("formSection.button")}
          </motion.button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
      </motion.div>
    </div>
  );
};

export default ContactPage;
