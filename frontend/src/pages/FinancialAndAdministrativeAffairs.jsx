// src/pages/Tamakon/FinancialAndAdministrativeAffairs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaUsersCog,
  FaCogs,
  FaTools,
  FaNetworkWired,
} from "react-icons/fa";

const FinancialAndAdministrativeAffairs = () => {
  const sections = [
    {
      title: "Technological Infrastructure",
      desc: "The person responsible for student enrollment, registration, transfer, withdrawal, and tracking the updating of student data.",
      icon: <FaCogs className="text-4xl text-[#104c80]" />,
      image: "/images/students.png",
    },
    {
      title: "Financial Affairs Department",
      desc: "This department is responsible for implementing and enforcing financial policies and regulations related to administrative decisions, students, and employees. It also prepares budget estimates and financial reports for senior management and relevant external entities.",
      icon: <FaMoneyBillWave className="text-4xl text-[#104c80]" />,
      image: "/images/statistics.png",
    },
    {
      title: "Human Resources Department",
      desc: "We provide regular technical monitoring services to ensure that systems and devices are operating smoothly in accordance with the standard benchmarks.",
      icon: <FaUsersCog className="text-4xl text-[#104c80]" />,
      image: "/images/talent-search.png",
    },
    {
      title: "Services Department",
      desc: "This department is responsible for student transportation and all matters related to school building maintenance.",
      icon: <FaTools className="text-4xl text-[#104c80]" />,
      image: "/images/service.png",
    },
    {
      title: "IT and Networking Department",
      desc: "This department is responsible for everything related to devices, their components, and the technological infrastructure of the school.",
      icon: <FaNetworkWired className="text-4xl text-[#104c80]" />,
      image: "/images/technology.png",
    },
  ];

  return (
    <div className="w-full text-gray-800">
      {/* ✅ Hero Banner */}
      <section
        className="relative w-full h-[55vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            Financial and Administrative Affairs
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-100 max-w-3xl mx-auto">
            مدرسة التمكن الشاملة / Financial and Administrative Affairs
          </p>
        </motion.div>
      </section>

      {/* ✅ Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-20 space-y-20"
      >
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-4">
            Welcome to Financial and Administrative Affairs
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our departments ensure smooth operations, financial transparency,
            and excellent support for students and staff.
          </p>
        </motion.div>

        {/* Loop Through Sections */}
        {sections.map((sec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-1 items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image with framed card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex justify-center items-center w-64 md:w-72 lg:w-80">
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Text Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {sec.icon}
                <h3 className="text-xl md:text-2xl font-bold text-[#104c80]">
                  {sec.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                {sec.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FinancialAndAdministrativeAffairs;
