import React from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaClipboardList, FaBroom, FaBus, FaTshirt, FaRegSmile, FaShareAlt, FaBuilding } from "react-icons/fa"

const PublicRelations = () => {
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
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl tracking-wide">
                        Public Relations Department
                    </h1>
                    <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
                        مدرسة التمكن الشاملة / Al-Tamakon Comprehensive School
                    </p>
                </motion.div>
            </section>

            {/* Content Area */}
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto space-y-8 px-4 lg:px-6 py-10 md:py-16"
            >
                {/* Intro */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#214282] drop-shadow-2xl">Public Relations Department </h1>
                <p className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-relaxed text-justify">
                    The Public Relations Department is a key academic and administrative unit at
                    <span className="text-[#104c80] font-bold"> Al-Tamakon Comprehensive School</span>.
                    It ensures smooth operations, hospitality, and communication within the institution, while also
                    managing student services and maintaining strong community engagement.
                </p>

                {/* Responsibilities */}
                <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 border border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-6 text-center">
                        Key Responsibilities
                    </h2>
                    <ul className="space-y-5">
                        <li className="flex items-start space-x-3">
                            <FaClipboardList className="text-[#104c80] mt-1 text-lg" />
                            <span>Managing reception tasks and facilitating student registration processes.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaBroom className="text-[#104c80] mt-1 text-lg" />
                            <span>Maintaining cleanliness across all school facilities and overseeing hospitality for events.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaUsers className="text-[#104c80] mt-1 text-lg" />
                            <span>Organizing school activities, events, and supporting community engagement initiatives.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaTshirt className="text-[#104c80] mt-1 text-lg" />
                            <span>Monitoring staff compliance with the school dress code.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaRegSmile className="text-[#104c80] mt-1 text-lg" />
                            <span>Supporting the incentive system by tracking gratitude, recognition, and employee engagement.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaBus className="text-[#104c80] mt-1 text-lg" />
                            <span>Supervising bus supervisors and ensuring safe student transportation during school hours.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaShareAlt className="text-[#104c80] mt-1 text-lg" />
                            <span>Managing the school’s social media platforms and informing parents about services and facilities.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <FaBuilding className="text-[#104c80] mt-1 text-lg" />
                            <span>Introducing new employees to school facilities, services, policies, and regulations.</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}

export default PublicRelations
