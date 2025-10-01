import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import JSON data
import nursingdepartment_en from "../../i18n/en/NursingDepartment.json";
import nursingdepartment_ar from "../../i18n/ar/NursingDepartment.json";

const NursingDepartment = () => {
  const { i18n } = useTranslation("nursingdepartment");

  // Select dataset according to active language
  const nursingdepartmentData =
    i18n.language === "ar" ? nursingdepartment_ar : nursingdepartment_en;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
            {nursingdepartmentData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
            {nursingdepartmentData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-6 relative inline-block"
        >
          {nursingdepartmentData.intro.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
        >
          {nursingdepartmentData.intro.description}
        </motion.p>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-6"
          >
            {nursingdepartmentData.vision.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            {nursingdepartmentData.vision.description}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-12 text-center"
        >
          {nursingdepartmentData.services.heading}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nursingdepartmentData.services.list.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-xl transition"
            >
              <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
              <p className="text-gray-700 leading-relaxed">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comprehensive Health Care */}
      <section className="bg-gradient-to-r from-[#104c80] to-[#1e3a5f] py-24 px-6 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-6"
          >
            {nursingdepartmentData.comprehensiveCare.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-100"
          >
            {nursingdepartmentData.comprehensiveCare.description}
          </motion.p>
        </div>
      </section>

      {/* Nurse Profile Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <img
            src={nursingdepartmentData.profile.image}
            alt={nursingdepartmentData.profile.name}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-[#104c80] mb-2">
              {nursingdepartmentData.profile.name}
            </h3>
            <p className="text-gray-600">{nursingdepartmentData.profile.role}</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default NursingDepartment;
