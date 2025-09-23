import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function FooterContact({ sectionVariants }) {
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

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
        Contact Us
        <motion.span
          className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.h3>

      <ul className="space-y-5">
        <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
          <FaMapMarkerAlt className="mt-1 text-[#1a84d2] text-3xl" />
          <p className="text-gray-200 text-sm">
            Ain Khaled, Umm Saneem, Al-Sammak Street 392, Area 56, Building 41
          </p>
        </li>
        <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
          <FaPhoneAlt className="mt-1 text-[#1a84d2] text-xl" />
          <a href="tel:44660466" className="text-white hover:text-[#cfe7ff] transition-colors">
            44660466
          </a>
        </li>
        <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
          <FaEnvelope className="mt-1 text-[#1a84d2] text-xl" />
          <a href="mailto:Info@tamakon.edu.qa" className="text-white hover:text-[#cfe7ff] transition-colors">
            Info@tamakon.edu.qa
          </a>
        </li>
        <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
          <FaWhatsapp className="mt-1 text-[#1a84d2] text-xl" />
          <a
            href="https://wa.me/97444660466"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#cfe7ff] transition-colors"
          >
            44660466
          </a>
        </li>
      </ul>
    </motion.div>
  );
}
