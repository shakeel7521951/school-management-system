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
      desc: "Responsible for student enrollment, registration, transfer, withdrawal, and tracking the updating of student data.",
      icon: <FaCogs className="text-4xl text-[#104c80]" />,
      image: "/images/students.png",
    },
    {
      title: "Financial Affairs Department",
      desc: "Implements financial policies, prepares budgets, and reports for senior management and relevant external entities.",
      icon: <FaMoneyBillWave className="text-4xl text-[#104c80]" />,
      image: "/images/statistics.png",
    },
    {
      title: "Human Resources Department",
      desc: "Ensures smooth operations and staff support in line with standard benchmarks.",
      icon: <FaUsersCog className="text-4xl text-[#104c80]" />,
      image: "/images/talent-search.png",
    },
    {
      title: "Services Department",
      desc: "Responsible for student transportation and school maintenance.",
      icon: <FaTools className="text-4xl text-[#104c80]" />,
      image: "/images/service.png",
    },
    {
      title: "IT and Networking Department",
      desc: "Handles all devices, components, and technological infrastructure of the school.",
      icon: <FaNetworkWired className="text-4xl text-[#104c80]" />,
      image: "/images/technology.png",
    },
  ];

  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {sections.map((sec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden">
              <img
                src={sec.image}
                alt={sec.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {sec.icon}
                <h3 className="text-xl md:text-2xl font-bold text-[#104c80]">
                  {sec.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{sec.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FinancialAndAdministrativeAffairs;
