import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import JSON translations
import middleandhighunit_en from "../../i18n/en/MiddleAndHighUnit.json";
import middleandhighunit_ar from "../../i18n/ar/MiddleAndHighUnit.json";

const MiddleAndHighUnit = () => {
  const { i18n } = useTranslation("middleandhighunit");

  // ✅ Corrected: choose dataset based on active language
  const middleandhighunit =
    i18n.language === "ar" ? middleandhighunit_ar : middleandhighunit_en;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${middleandhighunit.hero.backgroundImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b305a]/80 via-[#0b3f7a]/70 to-[#0a3255]/80"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold mb-5 text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)] tracking-wide">
            <span className="bg-clip-text text-transparent bg-white">
              {middleandhighunit.hero.title}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100 leading-relaxed mx-auto max-w-2xl">
            {middleandhighunit.hero.subtitle}
          </p>
        </motion.div>
      </section>


      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto space-y-6 sm:space-y-8 px-4 lg:px-6 py-10 md:py-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#104c80] mb-4 sm:mb-6 leading-snug text-center">
          {middleandhighunit.content.heading}
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 leading-relaxed text-justify border border-gray-100">
          {/* ✅ Allow HTML rendering from JSON (for <span> and <br />) */}
          <p
            className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] text-gray-700"
            dangerouslySetInnerHTML={{ __html: middleandhighunit.content.paragraph }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MiddleAndHighUnit;
