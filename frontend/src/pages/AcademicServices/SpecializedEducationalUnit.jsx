import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaBookOpen, FaStethoscope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import JSON Data
import specializededucationalunit_en from "../../i18n/en/SpecializedEducationalUnit.json";
import specializededucationalunit_ar from "../../i18n/ar/SpecializedEducationalUnit.json";

const SpecializedEducationalUnit = () => {
  const { i18n } = useTranslation("specializededucationalunit");

  // Select dataset according to active language
  const specializededucationalunitData =
    i18n.language === "ar"
      ? specializededucationalunit_ar
      : specializededucationalunit_en;

  // Icons mapping
  const icons = {
    FaBrain: (
      <FaBrain className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
    ),
    FaBookOpen: (
      <FaBookOpen className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
    ),
    FaStethoscope: (
      <FaStethoscope className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
    ),
  };

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner (No Image) */}
      <section className="relative w-full bg-gradient-to-br from-[#104c80] via-[#0e3d6b] to-[#08294d] flex items-center justify-center py-20 md:py-28 overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Centered Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {specializededucationalunitData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100 leading-relaxed max-w-2xl mx-auto">
            {specializededucationalunitData.hero.subtitle}
          </p>

          {/* Decorative Divider */}
          <div className="mt-8 w-28 h-1 bg-gradient-to-r from-white via-[#c5dfff] to-transparent mx-auto rounded-full"></div>
        </motion.div>
      </section>

      {/* Content Area (Text Left + Image Right) */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4 lg:px-6 py-12 md:py-20"
      >
        {/* Left Side: Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#104c80] mb-4">
            {specializededucationalunitData.content.heading} <br />
            <span className="text-[#104c80] font-light text-3xl">
              {specializededucationalunitData.content.subheading}
            </span>
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            {specializededucationalunitData.content.intro}
          </p>
        </div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="./images/img-5.jpeg"
            alt="Educational Illustration"
            className="w-full max-w-md max-h-72 rounded-2xl shadow-xl object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Dynamic Columns */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 lg:px-6 pb-20"
      >
        {specializededucationalunitData.content.columns.map((col, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 + idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col"
          >
            {icons[col.icon]}
            <h3 className="text-xl font-semibold text-[#104c80] mb-4 text-center">
              {col.title}
            </h3>
            <p
              className="text-gray-700 leading-relaxed text-base flex-grow text-center"
              dangerouslySetInnerHTML={{ __html: col.description }}
            />
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpecializedEducationalUnit;
