// src/pages/Tamakon/PersonalProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { TeamMembers } from "../../components/Tamakon/team/teamData";
import { FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";

export default function PersonalProfile() {
    const { id } = useParams();
    const member = TeamMembers.find((m) => m.id === parseInt(id));

    if (!member) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold text-red-600">Profile not found!</h2>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Top Heading */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#0C3570] text-center mb-12">
                    Personal Profile
                </h1>

                {/* Profile Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white shadow-xl rounded-2xl p-8">
                    {/* Left Side: Image */}
                    <div className="flex justify-center">
                        <img
                            src={member.photo}
                            alt={member.nameEn}
                            className="w-64 h-64 object-cover rounded-full p-4 border-2 border-gray-200 shadow-lg"
                        />
                    </div>

                    {/* Right Side: Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{member.nameEn}</h2>
                        <p className="text-[#3471b3] font-semibold text-xl mb-2">{member.titleEn}</p>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-r from-[#0C3570] to-[#3471b3] text-white rounded-lg shadow-lg p-5 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <FaEnvelope className="text-white text-lg" />
                                <span className="text-sm">example@email.com</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <FaPhone className="text-white text-lg" />
                                <span className="text-sm">+966 555 123 456</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaBuilding className="text-white text-lg" />
                                <span className="text-sm">{member.department} Department</span>
                            </div>
                        </div>

                        {/* Experience & Activities */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Experience & Activities</h3>
                            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
