import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FooterBottom({ sectionVariants }) {
  return (
    <motion.div
      className="mt-16 pt-8 border-t border-[#104c80] flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <p className="text-gray-300 text-sm text-center lg:text-left">
        جميع الحقوق محفوظة - مدرسة التمكن الشاملة 2025
      </p>

      <div className="flex items-center space-x-6">
        {["News", "Contact Us"].map((item, i) => (
          <Link
            key={i}
            to={item === "News" ? "/news" : "/contact-us"}
            className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#cfe7ff] 
              after:transition-all after:duration-500 hover:after:w-full"
          >
            {item}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
