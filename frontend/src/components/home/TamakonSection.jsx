import React from "react";
import { useTranslation } from "react-i18next";
import { FaBook, FaUsers, FaGlobe, FaGraduationCap, FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TamakonSection() {
  const { t } = useTranslation();

  const icons = [
    <FaBook className="text-3xl sm:text-4xl text-[#1A4480]" />,
    <FaUsers className="text-3xl sm:text-4xl text-[#1A4480]" />,
    <FaGlobe className="text-3xl sm:text-4xl text-[#1A4480]" />,
    <FaGraduationCap className="text-3xl sm:text-4xl text-[#1A4480]" />,
    <FaSchool className="text-3xl sm:text-4xl text-[#1A4480]" />,
    <FaUsers className="text-3xl sm:text-4xl text-[#1A4480]" />
  ];

  const infoBlocks = t("tamakonSection.infoBlocks", { returnObjects: true });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Contact */}
        <div className="text-center mb-12 sm:mb-16 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A4480] mb-4">
            {t("tamakonSection.heading")}
          </h2>
          <Link
            to="/contact-us"
            className="px-6 sm:px-6 w-[150px] py-3 sm:py-3 mt-4 font-semibold bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white rounded-full shadow-md hover:scale-105 transition sm:w-32 text-center"
          >
            {t("tamakonSection.contact")}
          </Link>
        </div>

        {/* Grid Info Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {infoBlocks.map((block, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">{icons[idx]}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A4480] mb-2 text-center">
                {block.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                {block.description}
              </p>
            </div>
          ))}
        </div>

        {/* Login Section */}
        <div className="bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col justify-center items-center text-center mb-12 sm:mb-16">
          <button className="text-lg sm:text-2xl md:text-3xl font-bold mb-4">
            {t("tamakonSection.loginSection.title")}
          </button>
          <Link
            to="/login"
            className="w-28 sm:w-32 px-5 sm:px-6 py-2 sm:py-3 bg-white text-[#1A4480] text-center font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            {t("tamakonSection.loginSection.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
