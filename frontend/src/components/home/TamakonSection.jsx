import React from "react";
import { FaBook, FaUsers, FaGlobe, FaGraduationCap, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TamakonSection() {
    const infoBlocks = [
        {
            title: "Comprehensive Curriculum",
            description: "A curriculum designed to nurture multiple intelligences and creativity in all students.",
            icon: <FaBook className="text-4xl text-[#1A4480]" />
        },
        {
            title: "Qualified Teachers",
            description: "Experienced and dedicated faculty committed to student growth and learning excellence.",
            icon: <FaUsers className="text-4xl text-[#1A4480]" />
        },
        {
            title: "Global Standards",
            description: "Internationally certified education and CIS membership ensuring world-class quality.",
            icon: <FaGlobe className="text-4xl text-[#1A4480]" />
        },
        {
            title: "Student Development",
            description: "Programs tailored for personal, academic, and social growth of each learner.",
            icon: <FaGraduationCap className="text-4xl text-[#1A4480]" />
        },
        {
            title: "Modern Facilities",
            description: "State-of-the-art infrastructure and learning resources for a complete educational experience.",
            icon: <FaSchool className="text-4xl text-[#1A4480]" />
        },
        {
            title: "Inclusive Learning",
            description: "Bilingual and accessible education for every child, fostering diversity and inclusion.",
            icon: <FaUsers className="text-4xl text-[#1A4480]" />
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Heading + Contact */}
                <div className="text-center mb-16 flex flex-col justify-center items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A4480] mb-4">
                        Tamakon Comprehensive School
                    </h2>
                    <Link to="/contact-us" className="px-6 py-3 mt-4 font-semibold bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white rounded-full shadow-md hover:scale-105 transition w-32">
                        Contact Us
                    </Link>
            </div>

            {/* Grid Info Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {infoBlocks.map((block, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                    >
                        <div className="flex items-center justify-center mb-4">
                            {block.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-[#1A4480] mb-2 text-center">{block.title}</h3>
                        <p className="text-gray-600 text-center">{block.description}</p>
                    </div>
                ))}
            </div>

            {/* Login Section */}
            <div className="bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white p-10 rounded-2xl flex flex-col justify-center items-center text-center mb-16">
                <button className="text-2xl md:text-3xl font-bold mb-4">
                    Login for Staff and Parents
                </button>
                <Link to="/login" className="w-32 px-6 py-3 bg-white text-[#1A4480] text-center font-semibold rounded-full shadow hover:bg-gray-100 transition">
                    LOGIN
                </Link>
            </div>


        </div>
        </section >
    );
}
