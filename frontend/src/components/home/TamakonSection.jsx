import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaBook,
  FaUsers,
  FaGlobe,
  FaGraduationCap,
  FaSchool,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TamakonSection() {
  const { t } = useTranslation();

  const icons = [
    <FaBook className="text-4xl sm:text-5xl text-[#1A4480]" />,
    <FaUsers className="text-4xl sm:text-5xl text-[#1A4480]" />,
    <FaGlobe className="text-4xl sm:text-5xl text-[#1A4480]" />,
    <FaGraduationCap className="text-4xl sm:text-5xl text-[#1A4480]" />,
    <FaSchool className="text-4xl sm:text-5xl text-[#1A4480]" />,
    <FaUsers className="text-4xl sm:text-5xl text-[#1A4480]" />,
  ];

  const infoBlocks = t("tamakonSection.infoBlocks", { returnObjects: true });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#eef3fb] via-[#f9fbff] to-white overflow-hidden">
      {/* Floating Background Blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-[#1A4480]/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#273C66]/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
       <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.9 }}
  className="text-center mb-16 flex flex-col justify-center items-center"
>
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A4480] mb-6 tracking-tight">
    {t("tamakonSection.heading")}
  </h2>

 <motion.div
  whileHover={{
    scale: 1.05, // smoother, slightly smaller than 1.1 for elegance
    transition: { duration: 0.4, ease: "easeOut" },
  }}
  whileTap={{ scale: 0.95 }}
  className="mt-6"
>
  <Link
    to="/contact-us"
    className="px-8 py-3 font-semibold bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    {t("tamakonSection.contact")}
  </Link>
</motion.div>

</motion.div>


        {/* Info Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {infoBlocks.map((block, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A4480]/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition duration-700"></div>

              {/* Floating Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex justify-center mb-6"
              >
                {icons[idx]}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A4480] mb-3 text-center group-hover:text-[#facc15] transition-colors duration-300">
                {block.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base text-center leading-relaxed">
                {block.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white p-10 rounded-3xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          {/* Animated Glow */}
         <motion.div
  className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover:opacity-20 transition duration-700 pointer-events-none"
  animate={{ opacity: [0.1, 0.3, 0.1] }}
  transition={{ duration: 5, repeat: Infinity }}
/>

          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
          >
            {t("tamakonSection.loginSection.title")}
          </motion.h3>

          <Link
            to="/login"
            className="w-[150px] px-4 py-2 bg-white text-[#1A4480] font-semibold rounded-full shadow hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {t("tamakonSection.loginSection.button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
