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
    i18n.language === "en"
      ? specializededucationalunit_ar
      : specializededucationalunit_en;

  // Icons mapping
  const icons = {
    FaBrain: <FaBrain className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />,
    FaBookOpen: <FaBookOpen className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />,
    FaStethoscope: <FaStethoscope className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />,
  };

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${specializededucationalunitData.hero.backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl md:w-[900px] tracking-normal md:leading-15 leading-10">
            {specializededucationalunitData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {specializededucationalunitData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto space-y-10 px-4 lg:px-6 py-12 md:py-20"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#104c80] text-center mb-8">
          {specializededucationalunitData.content.heading} <br />
          <span className="text-[#104c80] font-light text-3xl">
            {specializededucationalunitData.content.subheading}
          </span>
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          {specializededucationalunitData.content.intro}
        </p>

        {/* Dynamic Columns */}
        <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </motion.div>
    </div>
  );
};

export default SpecializedEducationalUnit;
