// src/components/Tamakon/team/TeamSection.jsx
import React, { useState } from "react";
import { TeamMembers, departmentColors, teamCategories } from "./teamData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TeamSection() {
    const [activeCategory, setActiveCategory] = useState("all");
    const navigate = useNavigate();

    const filteredTeam =
        activeCategory === "all"
            ? TeamMembers
            : TeamMembers.filter((member) => member.category === activeCategory);

    return (
        <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* ✅ Hero Section */}
            <section
                className="relative w-full h-[65vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
            >
                <div className="absolute inset-0 bg-[#104c80]/70"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-4"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold mt-14 mb-4">Team</h1>
                    <p className="text-lg text-indigo-200 mb-6">
                        مدرسة التمكن الشاملة &gt; Managers &gt;{" "}
                        <span className="font-semibold text-white">Dr. Hind Al-Rabah</span>
                    </p>
                    <div className="mt-6 w-[400px] bg-white text-gray-800 rounded-xl shadow-lg p-6 inline-block">
                        <h2 className="text-2xl font-bold">Dr. Hind Al-Rabah</h2>
                        <p className="text-sm text-gray-500">Director General</p>
                        <p className="text-sm text-center text-gray-600 mt-1">
                            د. هند الرباح – المدير العام بالإنابة
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ✅ Content Wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                {/* Council Description */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/20">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Medical and Administrative Academic Council
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#1A3C77] to-purple-700 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed text-center italic">
                        "The Academic and Administrative Council is represented by the presence of
                        all the major departments within the school. The council consists of
                        department heads who meet weekly in scheduled meetings on a fixed day, time,
                        and location. These meetings are one of the primary tools that contribute to
                        guiding academic and administrative matters within the school."
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 mt-10">
                    {teamCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                                    ? "bg-gradient-to-r from-[#0C3570] to-[#3471b3] text-white shadow-lg"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-[#3471b3]"
                                }`}
                        >
                            {category.name}{" "}
                            <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                                ({category.count})
                            </span>
                        </button>
                    ))}
                </div>

                {/* ✅ Team Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredTeam.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
                        >
                            {/* Department Color Bar */}
                            <div
                                className={`h-2 bg-gradient-to-r ${departmentColors[member.department] || "from-gray-500 to-gray-700"
                                    }`}
                            ></div>

                            <div className="p-6">
                                {/* Avatar */}
                                <div className="flex flex-col justify-center items-center mb-4">
                                    <div className="w-40 h-40 border-2 border-[#3471b3] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {member.photo ? (
                                            <img
                                                src={member.photo}
                                                alt={member.nameEn}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-[#3471b3]">
                                                {member.nameEn
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                            {member.nameEn}
                                        </h3>
                                        <p className="text-sm text-indigo-600 font-medium">
                                            {member.department}
                                        </p>
                                        <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full mt-1">
                                            {member.category}
                                        </span>
                                    </div>
                                </div>


                                {/* English Title */}
                                <p className="text-gray-700 font-medium mb-4 text-center bg-gradient-to-r from-gray-100 to-gray-200 py-2 rounded-lg">
                                    {member.titleEn}
                                </p>

                                {/* ✅ View Profile Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => navigate(`/team/${member.id}`)}
                                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0C3570] to-[#3471b3] text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}
