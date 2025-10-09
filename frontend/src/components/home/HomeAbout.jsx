import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HomeAbout() {
  const { t } = useTranslation("home");

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#e8f0fc] to-[#f9fbff] overflow-hidden">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#2d6dc6]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A4480]/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
        {/* Text Section */}
        <div className="w-full lg:w-6/12 text-center lg:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A4480] leading-tight">
            {t("homeAbout.title")}
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
            {t("homeAbout.description")}
          </p>

          <div>
            <Link
              to="/contact-us"
              className="inline-block px-6 py-3 text-[17px] font-semibold text-white rounded-full shadow-lg 
                         bg-gradient-to-r from-[#273C66] to-[#1A4480] 
                         hover:from-[#1A4480] hover:to-[#273C66] 
                         hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t("homeAbout.button")}
            </Link>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full lg:w-5/12 relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#1A4480]/10 hover:scale-105 transition-transform duration-500">
            <video
              src="./videos/video-2.mp4"
              className="w-full h-full object-cover rounded-3xl"
              aria-label={t("homeAbout.imageAlt")}
              autoPlay
              muted
              loop
              
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A4480]/30 to-transparent"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#1A4480]/10 rounded-full blur-md animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#facc15]/20 rounded-full blur-md animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
