import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FooterBrand({ sectionVariants }) {
  const { t } = useTranslation("footerbrand"); // using namespace 'footerbrand'

  return (
    <motion.div
      className="flex flex-col space-y-4"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-white">
        {t("footerBrand.title")}
      </h2>
      <p className="text-white text-[15px] leading-relaxed">
        {t("footerBrand.description")}
      </p>
    </motion.div>
  );
}
