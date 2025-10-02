import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function FooterMenu({ sectionVariants }) {
  const { t } = useTranslation("footermenu");

  const menuLinks = [
    { name: t("footermenu.links.news"), path: "/news" },
    { name: t("footermenu.links.team"), path: "/tamakon-team" },
    { name: t("footermenu.links.faq"), path: "/faqs" },
    { name: t("footermenu.links.contactUs"), path: "/contact-us" },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col space-y-4 lg:ml-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h3
        className="text-lg font-bold relative inline-block text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
        transition={{ duration: 0.8 }}
      >
        {t("footermenu.title")}
        <motion.span
          className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.h3>

      <ul className="space-y-3">
        {menuLinks.map((link, i) => (
          <li key={i}>
            <Link
              to={link.path}
              className="flex items-center text-gray-200 hover:text-white transition-all duration-300 group ml-[-20px]"
            >
              <FaArrowRight className="mr-2 text-sm text-[#cfe7ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
