import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeaderSection = () => {
  return (
    <div className="relative ">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-[90vh]"
      >
        {/* ---------- Slide 1 ---------- */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="./images/hero-bg.jpeg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-8">
                  Admission Now Open 2025-2026
                </h1>
                <p className="text-lg md:text-2xl text-gray-100 font-semibold mb-8">
                  Registration is now open for the academic year 2025-2026 with an exclusive early registration offer. Register as soon as possible to take advantage of the discount for all educational levels. 
                </p>
                <button className="px-7 py-4 bg-gradient-to-r from-[#2E2C7E] to-[#2E2C7E] rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition">
                  APPLY NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ---------- Slide 2 ---------- */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="./images/about-cover.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#224182]/50 to-[#224182]/50 flex items-center justify-center">
              <div className="text-center text-white max-w-5xl px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-8  mt-10">
                  Employee Incentive Project
                </h1>
                <p className="text-lg md:text-2xl font-semibold text-gray-200 mb-6">
                  Various organisations and institution growth, sustainability, and ensuring their continuity.The success of these organisations is fulfilling their roles depends on a set of resources, with the most important being human resources. In order for the latter to perform their tasks with a high level of efficiency, they need motivation and the desire to accomplish these tasks . This is where the organisation's role comes in, to stimulate these motivations and guide the behaviour of employees towards achieving the goals it has outlined
                </p>
                <button className="px-12 py-3 text-xl bg-transparent border-2 border-white/80 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition mt-4">
                   MORE
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderSection;
