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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

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
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
            Financial and Administrative Affairs
          </h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            مدرسة التمكن الشاملة / Financial and Administrative Affairs
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#104c80] mb-4">
              Our Departments
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#104c80] to-[#0a3255] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
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
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#104c80] leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {section.desc}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#104c80]/20 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default FinancialAndAdministrativeAffairs;