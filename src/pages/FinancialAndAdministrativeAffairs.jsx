import React from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaUsersCog,
  FaCogs,
  FaTools,
  FaNetworkWired,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import datasets
import financialandadministrativeaffairs_en from "../i18n/en/FinancialAndAdministrativeAffairs.json";
import financialandadministrativeaffairs_ar from "../i18n/ar/FinancialAndAdministrativeAffairs.json";

const iconMap = {
  FaMoneyBillWave: <FaMoneyBillWave className="text-4xl text-[#104c80]" />,
  FaUsersCog: <FaUsersCog className="text-4xl text-[#104c80]" />,
  FaCogs: <FaCogs className="text-4xl text-[#104c80]" />,
  FaTools: <FaTools className="text-4xl text-[#104c80]" />,
  FaNetworkWired: <FaNetworkWired className="text-4xl text-[#104c80]" />
};

const FinancialAndAdministrativeAffairs = () => {
  const { i18n } = useTranslation("financialandadministrativeaffairs");

  // Select dataset
  const financialandadministrativeaffairsData =
    i18n.language === "ar"
      ? financialandadministrativeaffairs_ar
      : financialandadministrativeaffairs_en;

  const sections = financialandadministrativeaffairsData.departments.list;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-cover bg-center flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#104c80]/90 via-[#104c80]/80 to-[#0a3255]/90" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
            {financialandadministrativeaffairsData.hero.title}
          </h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            {financialandadministrativeaffairsData.hero.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-12">
        <motion.div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#104c80] mb-4">
              {financialandadministrativeaffairsData.departments.heading}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-[#104c80]/10 to-[#0a3255]/10 rounded-lg">
                      {iconMap[section.icon]}
                    </div>
                    <h3 className="text-xl font-bold text-[#104c80] leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FinancialAndAdministrativeAffairs;
