import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import news data
import speechandlanguagetherapy_en from "../../i18n/en/SpeechAndLanguageTherapy.json";
import speechandlanguagetherapy_ar from "../../i18n/ar/SpeechAndLanguageTherapy.json";

const SpeechAndLanguageTherapy = () => {
  const { i18n } = useTranslation("speechandlanguagetherapy");

  // Select dataset according to active language
  const speechandlanguagetherapyData =
    i18n.language === "en"
      ? speechandlanguagetherapy_ar
      : speechandlanguagetherapy_en;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${speechandlanguagetherapyData.hero.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
            {speechandlanguagetherapyData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
            {speechandlanguagetherapyData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-6">
          {speechandlanguagetherapyData.intro.heading}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto"
        >
          {speechandlanguagetherapyData.intro.text}
        </motion.p>
      </section>

      {/* 3 Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {speechandlanguagetherapyData.features.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10, scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-[#104c80]/5 opacity-0 hover:opacity-100 transition-all"></div>
            <div className="p-8 text-center relative z-10">
              <img
                src={card.img}
                alt={card.title}
                className="w-24 h-24 mx-auto mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-[#104c80] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Disorders Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Framed Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl border-4 border-[#104c80]/40 shadow-2xl overflow-hidden"
        >
          <img
            src={speechandlanguagetherapyData.disorders.image}
            alt={speechandlanguagetherapyData.disorders.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-[#104c80] mb-6">
            {speechandlanguagetherapyData.disorders.title}
          </h3>
          <ul className="text-gray-700 leading-relaxed list-disc list-inside space-y-3">
            {speechandlanguagetherapyData.disorders.list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-6">
          {speechandlanguagetherapyData.vision.title}
        </h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          {speechandlanguagetherapyData.vision.text}
        </p>
      </section>

      {/* Healthcare Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-6">
          {speechandlanguagetherapyData.healthcare.title}
        </h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          {speechandlanguagetherapyData.healthcare.text}
        </p>
      </section>

      {/* Closing Section */}
      <section className="bg-gradient-to-r from-[#104c80] to-[#2c5375] text-white py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 drop-shadow-lg">
            {speechandlanguagetherapyData.closing.title}
          </h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed mb-8">
            {speechandlanguagetherapyData.closing.text}
          </p>
          <p className="text-lg font-semibold">
            {speechandlanguagetherapyData.closing.signature}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpeechAndLanguageTherapy;
