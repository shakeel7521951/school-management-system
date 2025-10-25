import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import JSON Data
import primaryunit_en from "../../i18n/en/PrimaryUnit.json";
import primaryunit_ar from "../../i18n/ar/PrimaryUnit.json";

const PrimaryUnit = () => {
  const { t, i18n } = useTranslation("primaryunit");

  // Select dataset according to active language
  const primaryunitData =
    i18n.language === "en" ? primaryunit_en : primaryunit_ar;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl md:w-[900px] mx-auto leading-16">
            {primaryunitData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {primaryunitData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Content Section with Image + Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-16"
      >
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/images/img-2.jpeg"
            alt="Primary Unit"
            className="rounded-2xl shadow-2xl w-full max-w-md max-h-96 object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-4">
            {primaryunitData.content.heading}
          </h2>
          <p className="text-[1.05rem] text-gray-700 leading-relaxed text-justify">
            <span className="text-[#104c80] font-medium">
              {primaryunitData.content.paragraph}
            </span>
            <br />
            {primaryunitData.content.paragraphtwo}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrimaryUnit;
