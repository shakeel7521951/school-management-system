import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TeamSection() {
  const { t } = useTranslation("team");
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const teamMembers = t("teamMembers", { returnObjects: true });
  const teamCategories = t("teamCategories", { returnObjects: true });
  const departmentColors = t("departmentColors", { returnObjects: true });

  const slugify = (text) =>
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9-]/g, "");

  const filteredTeam =
    activeCategory === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.1 },
    }),
  };

  return (
    <section className="relative bg-gradient-to-br from-[#eef3fb] via-[#eaf1ff] to-[#f3f6ff] overflow-hidden">
      {/* 🌄 Banner (unchanged) */}
      <section
        className="relative w-full h-[40vh] sm:h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${t("heroSection.backgroundImage")})` }}
      >
        <div className="absolute inset-0 bg-[#104c80]/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-xl mb-4">
            {t("heroSection.title")}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            {t("heroSection.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* ✨ Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* 🏛️ Council Section */}
        <motion.div
          className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-10 mb-16 shadow-2xl border border-white/40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0C3570] mb-3 tracking-tight">
              {t("councilSection.heading")}
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-[#0C3570] to-[#3471b3] mx-auto rounded-full"
            ></motion.div>
          </div>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center italic max-w-3xl mx-auto">
            {t("councilSection.description")}
          </p>

          {/* Floating Glow Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/30 via-blue-200/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </motion.div>

       {/* 🎨 Category Filters */}
<motion.div
  className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 mb-12"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {teamCategories.map((category) => {
    const count =
      category.id === "all"
        ? teamMembers.length
        : teamMembers.filter((m) => m.category === category.id).length;

    return (
      <motion.button
        whileHover={{
          scale: 1.1,
          background: "linear-gradient(to right, #0C3570, #3471b3)",
          color: "#fff",
        }}
        whileTap={{ scale: 0.95 }}
        key={category.id}
        onClick={() => setActiveCategory(category.id)}
        className={`flex items-center justify-center md:px-4 px-2 sm:px-6 py-2.5 rounded-full text-xs sm:text-base font-semibold tracking-wide shadow-md transition-all duration-300 text-center w-full sm:w-auto ${
          activeCategory === category.id
            ? "bg-gradient-to-r from-[#0C3570] to-[#3471b3] text-white"
            : "bg-white/90 text-gray-700 border border-gray-200 hover:shadow-lg"
        }`}
      >
        <span>{category.name}</span>
        <span className="ml-1 bg-white/30 px-2 py-0.5 rounded-full text-[11px] sm:text-xs">
          {count}
        </span>
      </motion.button>
    );
  })}
</motion.div>




        {/* 🧑‍💼 Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTeam.map((member, i) => (
            <motion.div
              key={member.id}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow:
                  "0 20px 40px rgba(52,113,179,0.25), 0 0 20px rgba(12,53,112,0.25)",
              }}
              className="group relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-500"
            >
              {/* Dept Color Bar */}
              <div
                className={`h-2 bg-gradient-to-r ${
                  departmentColors[member.department] ||
                  "from-gray-500 to-gray-700"
                }`}
              ></div>

              {/* Profile */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex flex-col items-center mb-5">
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.07 }}
                    transition={{ duration: 0.3 }}
                    className="w-36 h-36 rounded-full border-4 border-indigo-100 overflow-hidden shadow-inner relative bg-gradient-to-br from-slate-50 to-indigo-50"
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#3471b3]">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </motion.div>

                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium">
                      {member.department}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">
                      {teamCategories.find((c) => c.id === member.category)?.name ||
                        member.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p className="text-gray-700 font-medium mb-4 text-center bg-gradient-to-r from-gray-100 to-gray-200 py-2 rounded-lg text-sm sm:text-base shadow-inner">
                  {member.title}
                </p>

                {/* Button */}
                <div className="text-center mt-auto">
                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      boxShadow:
                        "0 0 20px rgba(12,53,112,0.4), 0 0 30px rgba(52,113,179,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      navigate(`/tamakon-team/${slugify(member.name)}`)
                    }
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#0C3570] to-[#3471b3] text-white text-sm sm:text-base font-semibold shadow-md transition-all duration-300"
                  >
                    {member.button}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

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
