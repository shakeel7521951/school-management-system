import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FooterBottom({ sectionVariants }) {
  const { t } = useTranslation("footerbottom");

  const links = [
    { id: 1, title: t("links.news"), path: "/news" },
    { id: 2, title: t("links.contact"), path: "/contact-us" },
  ];

  return (
    <motion.div
      className="pt-8 border-t border-[#104c80] flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Copyright */}
      <p className="text-gray-300 text-sm text-center lg:text-left">
        {t("copyright")}
      </p>

      {/* Footer Links */}
      <div className="flex items-center space-x-6">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#cfe7ff] 
              after:transition-all after:duration-500 hover:after:w-full"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
