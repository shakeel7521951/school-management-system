import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <section
      className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${t("heroSection.backgroundImage")})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#104c80]/50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
          {t("heroSection.title")}
        </h1>
        <p className="text-lg md:text-2xl font-medium drop-shadow">
          {t("heroSection.subtitle")}
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
