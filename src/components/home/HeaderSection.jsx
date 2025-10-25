import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    x: [0, 10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function HeaderSection() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative overflow-hidden font-['Poppins']"
    >
      {/* Floating gradient circles */}
      <motion.div
        className="absolute top-10 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-3xl pointer-events-none z-0"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 right-5 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 bg-gradient-to-r from-blue-400/40 to-cyan-400/30 rounded-full blur-2xl pointer-events-none z-0"
        variants={floatingVariants}
        animate="animate"
      />

      {/* Subtle overlay animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none z-0"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/80 pointer-events-none z-0" />

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/60",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="w-full h-[70vh] sm:h-[65vh] md:h-[80vh] lg:h-[86vh] relative z-10"
      >
        {/* Slide 1 - Apply Now */}
        <SwiperSlide>
          <div className="flex items-center justify-center h-full text-center text-white px-6 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-xl sm:max-w-2xl md:max-w-3xl relative z-30"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-white bg-clip-text text-transparent drop-shadow-lg">
                {t("slide1.title") || "Welcome to Tamakon"}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-4 sm:mt-6 mb-6 sm:mb-10 tracking-wide">
                {t("slide1.description") || "Join us today and start your journey"}
              </p>

              {/* Apply Now button - Using regular button with CSS animations */}
              <button
                onClick={() => {
                  console.log("Apply Now button clicked - navigating to registration");
                  navigate("/registration-form");
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#224182] via-[#3b63bb] to-[#5679e3] rounded-xl text-white font-semibold tracking-wide transition-all duration-300 text-base sm:text-lg cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-95"
                style={{
                  boxShadow: "0px 0px 20px rgba(34, 65, 130, 0.4)",
                }}
              >
                {t("slide1.button") || "Apply Now"}
              </button>
            </motion.div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Learn More */}
        <SwiperSlide>
          <div className="flex items-center justify-center h-full text-center text-white px-6 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-xl sm:max-w-2xl md:max-w-3xl relative z-30"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-white bg-clip-text text-transparent drop-shadow-lg">
                {t("slide2.title") || "Our Amazing Team"}
              </h1>
              <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-6 mb-6 sm:mb-10 text-gray-200 tracking-wide">
                {t("slide2.description") || "Meet the talented people behind Tamakon"}
              </p>

              {/* More button - Using regular button with CSS animations */}
              <button
                onClick={() => {
                  console.log("Learn More button clicked - navigating to team");
                  navigate("/tamakon-team");
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#224182] via-[#3b63bb] to-[#5679e3] rounded-xl text-white font-semibold tracking-wide transition-all duration-300 text-base sm:text-lg cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-95"
                style={{
                  boxShadow: "0px 0px 20px rgba(34, 65, 130, 0.4)",
                }}
              >
                {t("slide2.button") || "Learn More"}
              </button>
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Navigation Buttons */}
    {/* Navigation Buttons */}
<div className="absolute inset-0 justify-between items-center px-4 sm:px-6 md:px-8 z-40 pointer-events-none hidden sm:flex">
  <button
    className="custom-prev p-3 bg-white/15 hover:bg-white/30 backdrop-blur-xl rounded-full border border-white/40 transition pointer-events-auto"
  >
    <ChevronLeft className="text-white w-6 h-6 md:w-7 md:h-7" />
  </button>
  <button
    className="custom-next p-3 bg-white/15 hover:bg-white/30 backdrop-blur-xl rounded-full border border-white/40 transition pointer-events-auto"
  >
    <ChevronRight className="text-white w-6 h-6 md:w-7 md:h-7" />
  </button>
</div>


      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-white/30 z-30 pointer-events-none">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          className="h-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#0059F5] shadow-[0_0_20px_rgba(0,249,255,0.5)]"
        />
      </div>
    </motion.div>
  );
}