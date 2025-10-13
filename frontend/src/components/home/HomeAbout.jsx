import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HomeAbout() {
  const { t } = useTranslation("home");

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#e8f0fc] via-[#f4f8ff] to-[#f9fbff] overflow-hidden">
      {/* Decorative Floating Gradient Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 bg-[#2d6dc6]/15 rounded-full blur-3xl -z-10"
        variants={float}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A4480]/15 rounded-full blur-3xl -z-10"
        variants={float}
        animate="animate"
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,65,130,0.05),transparent_70%)] -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Text Section */}
        <motion.div
          className="w-full lg:w-6/12 text-center lg:text-left space-y-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-[#1A4480] leading-tight"
          >
            {t("homeAbout.title")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-700 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0"
          >
            {t("homeAbout.description")}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              to="/contact-us"
              className="inline-block px-8 py-3 text-lg font-semibold text-white rounded-full 
                         bg-gradient-to-r from-[#273C66] to-[#1A4480] 
                         shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95
                         transition-all duration-300 ease-in-out"
            >
              {t("homeAbout.button")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="w-full lg:w-5/12 relative flex justify-center"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#1A4480]/10"
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.video
              src="./videos/video-2.mp4"
              className="w-full h-full object-cover rounded-3xl"
              aria-label={t("homeAbout.imageAlt")}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A4480]/40 to-transparent" />
          </motion.div>

          {/* Floating Glow Effects */}
          <motion.div
            className="absolute -top-6 -left-6 w-16 h-16 bg-[#1A4480]/15 rounded-full blur-md"
            variants={float}
            animate="animate"
          />
          <motion.div
            className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#facc15]/30 rounded-full blur-md"
            variants={float}
            animate="animate"
          />
        </motion.div>
      </div>
    </section>
  );
}

