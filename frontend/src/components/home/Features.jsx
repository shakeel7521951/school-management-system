import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const featureKeys = [
    { image: "./images/image-01.jpg", key: "features.items.0" },
    { image: "./images/image-02.jpg", key: "features.items.1" },
    { image: "./images/image-03.jpg", key: "features.items.2" },
    { image: "./images/image-02.jpg", key: "features.items.3" },
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#eef3fb] via-[#f8faff] to-white overflow-hidden">
      {/* Background glow elements */}
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

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-16 px-6 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A4480] leading-tight">
          {t("features.heading.title")}
        </h2>
        <p className="text-base sm:text-lg font-medium text-gray-600 mt-4 max-w-2xl mx-auto">
          {t("features.heading.description")}
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
      >
        {featureKeys.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="group relative bg-gradient-to-b from-[#273C66] to-[#1A4480] text-white 
                       p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 
                       flex flex-col items-center text-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition duration-500"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mb-6 w-32 h-32 flex items-center justify-center bg-white/10 rounded-full overflow-hidden shadow-inner"
            >
              <img
                src={item.image}
                alt={t(`${item.key}.title`)}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 relative z-10 group-hover:text-yellow-300 transition-colors duration-300">
              {t(`${item.key}.title`)}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed relative z-10">
              {t(`${item.key}.desc`)}
            </p>

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/30 transition-all duration-700"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(255,255,255,0)",
                  "0 0 15px rgba(255,255,255,0.25)",
                  "0 0 0 rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
