import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";

// Import news data
import primaryunit_en from "../../i18n/en/PrimaryUnit.json";
import primaryunit_ar from "../../i18n/ar/PrimaryUnit.json";


const PrimaryUnit = () => {
const { t, i18n } = useTranslation("primaryunit");

// Select dataset according to active language
    const primaryunitData = i18n.language === "en" ? primaryunit_en : primaryunit_ar;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl md:w-[900px] tracking-normal md:leading-15 leading-10">
           {primaryunitData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {primaryunitData.hero.subtitle}

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
         {primaryunitData.content.heading}
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 leading-relaxed text-justify border border-gray-100">
          <p className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] text-gray-700">
            <span className='text-[#104c80]'> {primaryunitData.content.paragraph} </span> <br />
           {primaryunitData.content.paragraphtwo}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PrimaryUnit