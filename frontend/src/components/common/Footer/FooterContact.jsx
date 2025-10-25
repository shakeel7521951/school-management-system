import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function FooterContact({ sectionVariants }) {
  const { t } = useTranslation("footercontact");

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const contactItems = [
    {
      icon: <FaMapMarkerAlt className="mt-1 text-[#1a84d2] text-3xl" />,
      content: t("address"),
    },
    {
      icon: <FaPhoneAlt className="mt-1 text-[#1a84d2] text-xl" />,
      content: (
        <a href={`tel:${t("phone")}`} className="text-white hover:text-[#cfe7ff] transition-colors">
          {t("phone")}
        </a>
      ),
    },
    {
      icon: <FaEnvelope className="mt-1 text-[#1a84d2] text-xl" />,
      content: (
        <a href={`mailto:${t("email")}`} className="text-white hover:text-[#cfe7ff] transition-colors">
          {t("email")}
        </a>
      ),
    },
    {
      icon: <FaWhatsapp className="mt-1 text-[#1a84d2] text-xl" />,
      content: (
        <a
          href={`https://wa.me/${t("whatsapp")}`}
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-[#cfe7ff] transition-colors"
        >
          {t("whatsapp")}
        </a>
      ),
    },
  ];

  return (
    <motion.div
      className="flex flex-col space-y-4"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.h3
        className="text-lg font-bold relative inline-block text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
        transition={{ duration: 0.8 }}
      >
        {t("title")}
        <motion.span
          className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.h3>

      <ul className="space-y-5">
        {contactItems.map((item, i) => (
          <li
            key={i}
            className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300"
          >
            {item.icon}
            <p className="text-gray-200 text-sm">{item.content}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
