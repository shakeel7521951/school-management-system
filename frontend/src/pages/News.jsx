import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import news data
import news_en from "../i18n/en/News.json";
import news_ar from "../i18n/ar/News.json";

export default function NewsPage() {
  const { t, i18n } = useTranslation("news");

  // Select dataset according to active language
  const newsData = i18n.language === "ar" ? news_en : news_ar;

  return (
    <div className="w-full text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
        role="img"
        aria-label={t("heroAlt", { defaultValue: "News cover background" })}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
            {t("newsTitle", { defaultValue: "News" })}
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
            {t("newsSubtitle", { defaultValue: "مدرسة التمكن الشاملة / News" })}
          </p>
        </motion.div>
      </section>

      {/* News Cards */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsData.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              y: -6,
              boxShadow: "8px 8px 20px rgba(0, 0, 0, 0.15)",
            }}
            className="relative bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between transition-all duration-300 shadow-[6px_6px_15px_rgba(0,0,0,0.08)]"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#104c80] rounded-tl-xl rounded-tr-xl"></div>

            <div className="mt-2">
              {item.date && (
                <p className="text-sm text-gray-400">{item.date}</p>
              )}
              <h2 className="text-xl font-semibold text-[#104c80] mt-2 leading-snug">
                {item.title}
              </h2>
              {item.author && (
                <p className="text-gray-600 font-medium mt-1">{item.author}</p>
              )}
              {item.content && (
                <p className="text-gray-700 mt-3 line-clamp-4">{item.content}</p>
              )}
            </div>

            {/* Link Icon */}
            <div className="mt-4 flex justify-end">
              <Link
                to={`/news/${item.slug}`}
                className="text-[#104c80] hover:text-[#0a3255] flex items-center font-medium"
              >
                {t("view", { defaultValue: "View" })}{" "}
                <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
