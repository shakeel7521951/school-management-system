import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function FAQs() {
  const { t } = useTranslation("faq");
  const [openIndex, setOpenIndex] = useState(null);

  const heroSection = t("heroSection", { returnObjects: true });
  const faqSection = t("faqSection", { returnObjects: true });
  const formSection = t("formSection", { returnObjects: true });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroSection.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-xl tracking-wide">
            {heroSection.title}
          </h1>
          <p className="text-lg md:text-2xl font-medium text-gray-100 drop-shadow">
            {heroSection.subtitle}
          </p>
        </motion.div>
      </section>

      {/* FAQ + Form Section */}
      <div className="mt-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-stretch py-5">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-xl flex flex-col"
        >
          <h3 className="text-3xl font-bold text-[#104c80] mb-8 text-center md:text-left">
            {faqSection.heading}
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-[#104c80]/70 scrollbar-track-gray-100">
            {faqSection.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left font-semibold text-gray-800 text-lg"
                >
                  {faq.q}
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow-xl flex flex-col justify-between"
        >
          <h3 className="text-3xl font-bold text-[#104c80] mb-6 text-center md:text-left">
            {formSection.heading}
          </h3>
          <form className="space-y-5 flex-1 flex flex-col justify-between">
            <input
              type="text"
              placeholder={formSection.fields.name}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104c80] transition"
            />
            <input
              type="email"
              placeholder={formSection.fields.email}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104c80] transition"
            />
            <input
              type="tel"
              placeholder={formSection.fields.phone}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104c80] transition"
            />
            <input
              type="text"
              placeholder={formSection.fields.topic}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104c80] transition"
            />
            <textarea
              placeholder={formSection.fields.message}
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#104c80] transition"
            ></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[250px]  mx-auto bg-gradient-to-r from-[#104c80] to-[#0a3255] text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
            >
              {formSection.submit}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
