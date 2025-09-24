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
            image: "/images/infra.jpg", // replace with actual image
        },
        {
            title: "Financial Affairs Department",
            desc: "This department is responsible for implementing and enforcing financial policies and regulations related to administrative decisions, students, and employees. It also prepares budget estimates and financial reports for senior management and relevant external entities.",
            icon: <FaMoneyBillWave className="text-4xl text-[#104c80]" />,
            image: "/images/finance.jpg", // replace with actual image
        },
        {
            title: "Human Resources Department",
            desc: "We provide regular technical monitoring services to ensure that systems and devices are operating smoothly in accordance with the standard benchmarks.",
            icon: <FaUsersCog className="text-4xl text-[#104c80]" />,
            image: "/images/hr.jpg", // replace with actual image
        },
        {
            title: "Services Department",
            desc: "This department is responsible for student transportation and all matters related to school building maintenance.",
            icon: <FaTools className="text-4xl text-[#104c80]" />,
            image: "/images/services.jpg", // replace with actual image
        },
        {
            title: "IT and Networking Department",
            desc: "This department is responsible for everything related to devices, their components, and the technological infrastructure of the school.",
            icon: <FaNetworkWired className="text-4xl text-[#104c80]" />,
            image: "/images/it.jpg", // replace with actual image
        },
    ];

    return (
        <div className="w-full text-gray-800">
            {/* ✅ Hero Banner */}
            <section
                className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                        Financial and Administrative Affairs
                    </h1>
                    <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
                        مدرسة التمكن الشاملة &gt; Financial and Administrative Affairs
                    </p>
                </motion.div>
            </section>

            {/* ✅ Main Content */}
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16"
            >
                {/* Intro */}
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-4">
                        Welcome to Financial and Administrative Affairs
                    </h2>
                   
                </div>

                {/* Loop Through Sections */}
                {sections.map((sec, idx) => (
                    <div
                        key={idx}
                        className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src={sec.image}
                                alt={sec.title}
                                className="w-full md:w-96 rounded-2xl shadow-lg border border-gray-200"
                            />
                        </div>

                        {/* Text */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                {sec.icon}
                                <h3 className="text-xl md:text-2xl font-bold text-[#104c80]">
                                    {sec.title}
                                </h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {sec.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default FinancialAndAdministrativeAffairs;
