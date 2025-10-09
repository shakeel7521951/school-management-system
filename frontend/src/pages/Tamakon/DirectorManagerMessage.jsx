import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DirectorManagerMessage() {
  const { t } = useTranslation("directorManager");
  const paragraphs = t("contentSection.paragraphs", { returnObjects: true });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] sm:h-[55vh] md:h-[50vh] lg:h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${t("heroSection.backgroundImage")})` }}
      >
        {/* Animated Overlay */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"
        ></motion.div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 text-center text-white px-4 sm:px-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-4xl font-bold mb-4 drop-shadow-xl tracking-wide"
          >
            {t("heroSection.title")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-100 drop-shadow"
          >
            {t("heroSection.subtitle")}
          </motion.p>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Text Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeLeft}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#104c80] mb-6 sm:mb-8 leading-snug"
            >
              {t("contentSection.heading")}
            </motion.h2>

            {/* Animated Paragraphs */}
            <div className="space-y-4 px-3 lg:px-0 sm:space-y-5 text-gray-700 leading-relaxed text-justify text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.05rem]">
              {paragraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -40 : 40, // alternate left-right animation
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="mt-6 sm:mt-8 lg:mt-10"
            >
              <p className="text-lg sm:text-xl font-semibold text-[#104c80]">
                {t("contentSection.signature.position")}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {t("contentSection.signature.name")}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-1 bg-[#104c80] mt-2 rounded-full"
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
            className="flex justify-center"
          >
            <motion.img
              // whileHover={{ scale: 1.04, rotate: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={t("contentSection.signature.image")}
              alt={t("contentSection.signature.name")}
              className="rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover ring-4 ring-[#104c80]/20"
              style={{ height: "450px", maxHeight: "70vh" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
