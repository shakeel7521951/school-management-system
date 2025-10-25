import React from "react";
import { motion } from "framer-motion";
import Section from "../../components/Tamakon/about/Section";
import InlineImage from "../../components/Tamakon/about/InlineImage";
import VisionMission from "../../components/Tamakon/about/VisionMission";
import HeroSection from "../../components/Tamakon/about/HeroSection";
import { useTranslation } from "react-i18next";

// 🔹 Directional animation variants
const fadeIn = (direction = "up") => {
  const distance = 60;
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return variants;
};

const AboutUs = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* 🌟 Hero Section */}
      <HeroSection />

      <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32 relative">
        {/* Background blur accents */}
        <div className="absolute top-20 left-0 w-32 h-32 md:w-48 md:h-48 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 bg-pink-100/40 rounded-full blur-3xl"></div>

        {/* 🟦 Who We Are (slide from LEFT) */}
        <motion.div variants={fadeIn("left")} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Section title={t("sections.whoWeAre.title")} direction="left">
            <motion.div
              className="flex flex-col md:flex-row items-start justify-between gap-6 sm:gap-10 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-blue-100/60 hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="md:w-1/2 space-y-4" variants={fadeIn("left")}>
                <p className="leading-relaxed text-base sm:text-lg text-gray-700 font-medium bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm backdrop-blur-md">
                  {t("sections.whoWeAre.content")}
                </p>
              </motion.div>

              <motion.div className="md:w-1/2 flex justify-center" variants={fadeIn("right")}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/60 w-full max-w-md">
                  <InlineImage src="/videos/video-1.mp4" alt="Al-Tamakon School" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </Section>
        </motion.div>

        {/* 🟧 Our History (slide from RIGHT) */}
        <motion.div variants={fadeIn("right")} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Section title={t("sections.ourHistory.title")} direction="right">
            <motion.div
              className="bg-gradient-to-br from-amber-50/60 to-orange-50/20 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-amber-100/70 hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <motion.p
                variants={fadeIn("up")}
                className="leading-relaxed text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm"
              >
                {t("sections.ourHistory.content1")}
              </motion.p>
              <motion.p
                variants={fadeIn("up")}
                className="leading-relaxed text-base sm:text-lg text-gray-700 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm"
              >
                {t("sections.ourHistory.content2")}
              </motion.p>
            </motion.div>
          </Section>
        </motion.div>

        {/* 🟩 Achievements (slide from BOTTOM) */}
        <motion.div variants={fadeIn("up")} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Section title={t("sections.achievements.title")} direction="up">
            <motion.div
              className="bg-gradient-to-tl from-emerald-50/50 to-teal-50/30 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-emerald-100/70 hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <motion.p
                variants={fadeIn("up")}
                className="leading-relaxed text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm"
              >
                {t("sections.achievements.content1")}
              </motion.p>
              <motion.p
                variants={fadeIn("up")}
                className="leading-relaxed text-base sm:text-lg text-gray-700 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm"
              >
                {t("sections.achievements.content2")}
              </motion.p>
            </motion.div>
          </Section>
        </motion.div>

        {/* 🟣 Campus (slide from LEFT and RIGHT alternately) */}
        <motion.div variants={fadeIn("left")} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Section title={t("sections.campus.title")} direction="left">
            <motion.div
              className="flex flex-col-reverse md:flex-row items-start justify-between gap-6 sm:gap-10 bg-gradient-to-r from-purple-50/50 to-pink-50/30 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-purple-100/60 hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="md:w-1/2 space-y-4" variants={fadeIn("left")}>
                <p className="leading-relaxed text-base sm:text-lg text-gray-700 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm">
                  {t("sections.campus.content")}
                </p>
              </motion.div>

              <motion.div className="md:w-1/2 flex justify-center" variants={fadeIn("right")}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/60 w-full max-w-md md:h-[400px]">
                  <img
                    src="/images/hero-bg.jpeg"
                    alt="Campus"
                    className="w-full h-full rounded-3xl object-cover z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-3xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </Section>
        </motion.div>

        {/* 💫 Vision & Mission (fade + scale-in) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="transform transition-transform duration-700"
        >
          <VisionMission />
        </motion.div>

        {/* ❤️ Individualized Care (slide from TOP) */}
        <motion.div variants={fadeIn("down")} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Section title={t("sections.individualizedCare.title")} direction="up">
            <motion.div
              className="flex flex-col-reverse md:flex-row items-start justify-between gap-6 sm:gap-10 bg-gradient-to-l from-rose-50/50 to-red-50/30 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-rose-100/60 hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="md:w-1/2 space-y-4" variants={fadeIn("left")}>
                <p className="leading-relaxed text-base sm:text-lg text-gray-700 bg-white/80 p-4 sm:p-6 rounded-2xl shadow-sm">
                  {t("sections.individualizedCare.content")}
                </p>
              </motion.div>

              <motion.div className="md:w-1/2 flex justify-center" variants={fadeIn("right")}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/60 w-full max-w-md md:w-full">
                  <img
                    src="/images/img-1.jpeg"
                    alt="Individualized Care"
                    className="w-full rounded-3xl object-cover z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent rounded-3xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </Section>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
