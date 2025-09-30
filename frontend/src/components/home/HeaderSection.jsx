import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function HeaderSection() {
  const { t } = useTranslation("home");
  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl"
        variants={floatingVariants}
        animate="animate"
      />

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/60",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        className="w-full h-[90vh] group relative z-10"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <motion.img
              src="./images/hero-bg.jpeg"
              alt="Admission"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/70 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center text-white max-w-3xl px-6"
              >
                <h1 className="text-4xl md:text-4xl md:w-[750px] font-bold mb-6">
                  Admission Now Open 2025-2026
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  Registration is now open for the academic year 2025-2026 with an exclusive early registration offer.Register as soon as possible to take advantage of the discount for all the educational levels.
                </p>
                <Link to="/registration-form">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#224182] to-[#3b63bb] rounded-lg text-white text-lg font-semibold shadow-lg"
                  >
                    APPLY NOW
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <motion.img
              src="./images/hero-bg.jpeg"
              alt="Employee Incentive"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center text-white max-w-3xl px-6"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Employee Incentive Project
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                  Organizations and institutions strive for growth, sustainability, and continuity. Their success depends greatly on human resources, who must be motivated to work with efficiency. To achieve this, organizations play a key role in inspiring, guiding, and directing employees. This ensures that efforts align with the goals set out for long-term success.
                </p>
                <Link to="/tamakon-team">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 text-lg bg-gradient-to-r from-[#224182] to-[#3b63bb] rounded-lg"
                  >
                    MORE
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20 hidden lg:flex">
        <div className="custom-prev cursor-pointer bg-gradient-to-r from-[#224182] to-[#3b63bb] w-14 h-14 rounded-full flex items-center justify-center shadow-xl">
          <ChevronLeft className="text-white w-7 h-7" />
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-20 hidden lg:flex">
        <div className="custom-next cursor-pointer bg-gradient-to-r from-[#224182] to-[#3b63bb] w-14 h-14 rounded-full flex items-center justify-center shadow-xl">
          <ChevronRight className="text-white w-7 h-7" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-white/30 z-20">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          className="h-full bg-gradient-to-r from-yellow-400 to-pink-500"
        />
      </div>
    </div>
  );
}
