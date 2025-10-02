import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaBroom, FaBus, FaTshirt, FaRegSmile, FaShareAlt, FaBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import JSON data
import publicrelations_en from "../i18n/en/PublicRelations.json";
import publicrelations_ar from "../i18n/ar/PublicRelations.json";

const PublicRelations = () => {
  const { i18n } = useTranslation("publicrelations");

  // Select dataset according to active language
  const publicrelationsData = i18n.language === "ar" ? publicrelations_ar : publicrelations_en;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
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
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl tracking-wide">
            {publicrelationsData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {publicrelationsData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto space-y-8 px-4 lg:px-6 py-10 md:py-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#214282] drop-shadow-2xl">
          {publicrelationsData.intro.heading}
        </h1>
        <p className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-relaxed text-justify">
          {publicrelationsData.intro.description}
        </p>

        {/* Responsibilities */}
        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-6 text-center">
            {publicrelationsData.responsibilities.heading}
          </h2>
          <ul className="space-y-5">
            {publicrelationsData.responsibilities.list.map((item, idx) => {
              // Choose icon based on index (optional, matches previous icons)
              const icons = [FaClipboardList, FaBroom, FaUsers, FaTshirt, FaRegSmile, FaBus, FaShareAlt, FaBuilding];
              const Icon = icons[idx] || FaClipboardList;
              return (
                <li key={idx} className="flex items-start space-x-3">
                  <Icon className="text-[#104c80] mt-1 text-lg" />
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicRelations;
