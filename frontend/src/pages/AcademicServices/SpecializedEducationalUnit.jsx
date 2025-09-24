import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaBookOpen, FaStethoscope } from "react-icons/fa";

const SpecializedEducationalUnit = () => {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl md:w-[900px] tracking-normal leading-15">
            Specialized Education Unit
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            مدرسة التمكن الشاملة / Specialized Education Unit
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
          Specialized Education Unit <br />
          <span className="text-[#104c80] font-light text-3xl">
            Males & Females
          </span>
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          We offer specialized education and training services within
          international programs designed for individuals with special needs.
          The focus is on :
        </p>

        {/* Three Columns */}
        <div className="grid md:grid-cols-3 gap-8">
         {/* Skill Development */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col"
>
  <FaBrain className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
  <h3 className="text-xl font-semibold text-[#104c80] mb-4 text-center">
    Skill Development Aspect
  </h3>
  <p className="text-gray-700 leading-relaxed text-base flex-grow text-center">
    Focused training in cognitive, motor, self-care, communication, and social
    interaction skills. Students benefit from the{" "}
    <strong>ABLLS-R</strong> (Assessment of Basic Language and Learning Skills –
    Revised) and structured classroom environments guided by the{" "}
    <strong>TEACCH program</strong>.
  </p>
  <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full"></div>
</motion.div>


          {/* Academic */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col"
          >
            <FaBookOpen className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
            <h3 className="text-xl font-semibold text-[#104c80] mb-4 text-center">
              Academic Aspect
            </h3>
            <p className="text-gray-700 leading-relaxed text-base flex-grow text-center">
              Students in this unit follow the{" "}
              <strong>special education certificate</strong>, which adheres to
              standards lower than the age-based (ministerial) levels. Programs
              are adapted to their abilities and needs, with{" "}
              <strong>alternative assessments</strong> conducted across all
              subjects.
            </p>
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full"></div>
          </motion.div>

          {/* Therapy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col"
          >
            <FaStethoscope className="text-5xl text-[#104c80] mb-6 mx-auto drop-shadow-md" />
            <h3 className="text-xl font-semibold text-[#104c80] mb-4 text-center">
              Therapeutic Medical Rehabilitation
            </h3>
            <p className="text-gray-700 leading-relaxed text-base flex-grow text-center">
              Rehabilitation services are provided based on individual needs,
              including <strong>occupational therapy, physical therapy,</strong>{" "}
              and <strong>speech & language therapy</strong>, ensuring
              comprehensive support for every student.
            </p>
            <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecializedEducationalUnit;
