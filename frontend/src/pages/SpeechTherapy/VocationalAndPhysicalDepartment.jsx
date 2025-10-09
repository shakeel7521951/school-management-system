import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import json data
import vocationalandphysicaldepartment_en from "../../i18n/en/VocationalAndPhysicalDepartment.json";
import vocationalandphysicaldepartment_ar from "../../i18n/ar/VocationalAndPhysicalDepartment.json";

const VocationalAndPhysicalDepartment = () => {
  const { i18n } = useTranslation("vocationalandphysicaldepartment");

  // Select dataset according to active language
  const vocationalandphysicaldepartmentData =
    i18n.language === "ar"
      ? vocationalandphysicaldepartment_ar
      : vocationalandphysicaldepartment_en;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${vocationalandphysicaldepartmentData.hero.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl md:w-[850px] font-bold mb-4 drop-shadow-2xl">
            {vocationalandphysicaldepartmentData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
            {vocationalandphysicaldepartmentData.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-6 text-center md:text-left">
            {vocationalandphysicaldepartmentData.intro.heading}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
            {vocationalandphysicaldepartmentData.intro.text}
          </p>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <video
            src="./videos/video-3.mp4"
            alt="Department Overview"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
            autoPlay muted loop
          />
        </motion.div>
      </section>


      {/* What is Occupational Therapy */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#104c80] mb-4">
            {vocationalandphysicaldepartmentData.occupationalTherapy.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {vocationalandphysicaldepartmentData.occupationalTherapy.text}
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {vocationalandphysicaldepartmentData.occupationalTherapy.categories.map(
            (item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-left"
              >
                <h3 className="flex items-start gap-3 text-gray-700">
                  <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
                  {item}
                </h3>
              </motion.div>
            )
          )}
        </div>

        {/* Goals */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#104c80] mb-6">
            {vocationalandphysicaldepartmentData.occupationalTherapy.goalsTitle}
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 text-left max-w-3xl mx-auto">
            {vocationalandphysicaldepartmentData.occupationalTherapy.goals.map(
              (goal, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
                  {goal}
                </motion.li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* Physical Therapy Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#104c80] mb-6">
            {vocationalandphysicaldepartmentData.physicalTherapy.title}
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
            {vocationalandphysicaldepartmentData.physicalTherapy.text}
          </p>

          {/* List and Image Wrapper */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 max-w-4xl mx-auto">
            {/* Points List */}
            <ul className="flex-1 space-y-4 text-gray-700 text-left text-xl">
              {vocationalandphysicaldepartmentData.physicalTherapy.points.map(
                (point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-[#104c80] text-xl mt-1 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                )
              )}
            </ul>

            {/* Image beside list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center w-full md:w-[50%] h-[350px]"
            >
              <img
                src="./images/img-6.jpeg"
                alt="Physical Therapy Illustration"
                className="rounded-2xl shadow-xl w-[100%] h-[80%]  object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* Closing Section */}
      <section className="bg-gradient-to-r from-[#104c80] to-[#1e3a5f] py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6 text-white drop-shadow-lg"
          >
            {vocationalandphysicaldepartmentData.closing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-100"
          >
            {vocationalandphysicaldepartmentData.closing.text}
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default VocationalAndPhysicalDepartment;
