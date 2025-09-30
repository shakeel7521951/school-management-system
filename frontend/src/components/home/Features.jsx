import React from "react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const featureKeys = [
    { image: "./images/language.png", key: "features.items.0" },
    { image: "./images/edu.png", key: "features.items.1" },
    { image: "./images/technologies.png", key: "features.items.2" },
    { image: "./images/brightfuture.png", key: "features.items.3" },
  ];

  return (
    <section className="py-16 bg-white">
      {/* Heading Section */}
      <div className="container mx-auto px-4 sm:px-6 text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#1A4480]">
          {t("features.heading.title")}
        </h2>
        <p className="text-base sm:text-lg font-semibold text-gray-600 mt-4 max-w-2xl mx-auto">
          {t("features.heading.description")}
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featureKeys.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#273C66] to-[#1A4480] text-white p-6 sm:p-8 rounded-xl shadow-lg hover:scale-105 transition flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="mb-6">
              <img
                src={item.image}
                alt={t(`${item.key}.title`)}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              {t(`${item.key}.title`)}
            </h3>
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200">
              {t(`${item.key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
