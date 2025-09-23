import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const menuLinks = [
    { name: "News", path: "/news" },
    { name: "Team", path: "/team" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = menuLinks.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    if (filtered.length === 1) navigate(filtered[0].path);
  };

  useEffect(() => {
    const orb = document.querySelector(".orb");
    const handleMove = (e) => {
      if (orb) {
        requestAnimationFrame(() => {
          orb.style.left = `${e.clientX}px`;
          orb.style.top = `${e.clientY}px`;
        });
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Shared heading animation
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Fade-in for footer sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('./images/footer-cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-[#0c427c]/90">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
            {/* Brand */}
            <motion.div
              className="flex flex-col space-y-4"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white">
                Al Tamkon Comprehensive School
              </h2>
              <p className="text-white text-[15px] leading-relaxed">
                Al Tamkon Comprehensive School was established in 2008 to meet
                the growing community needs for comprehensive services for
                students with Multiple Intelligences and Abilities. It was the
                first licensed private school for students with special needs in
                Qatar, providing therapeutic education and rehabilitation for
                males and females across all levels.
              </p>
            </motion.div>

            {/* Menu */}
            <motion.div
              className="flex flex-col space-y-4 ml-20"
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
                Menu
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

            {/* Contact */}
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
                    Ain Khaled, Umm Saneem, Al-Sammak Street 392, Area 56,
                    Building 41
                  </p>
                </li>
                <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <FaPhoneAlt className="mt-1 text-[#1a84d2] text-xl" />
                  <a
                    href="tel:44660466"
                    className="text-white hover:text-[#cfe7ff] transition-colors"
                  >
                    44660466
                  </a>
                </li>
                <li className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <FaEnvelope className="mt-1 text-[#1a84d2] text-xl" />
                  <a
                    href="mailto:Info@tamakon.edu.qa"
                    className="text-white hover:text-[#cfe7ff] transition-colors"
                  >
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

            {/* Search */}
            <motion.div
              className="flex flex-col space-y-4"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h3
                className="text-lg font-bold relative inline-block text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={headingVariants}
                transition={{ duration: 0.8 }}
              >
                Search in Website
                <motion.span
                  className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.h3>

              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-white/10 border border-[#cfe7ff]/40 rounded-xl py-3 px-4 
                             text-white placeholder-gray-300 shadow-md
                             focus:outline-none focus:ring-2 focus:ring-[#cfe7ff] focus:border-[#cfe7ff]
                             transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cfe7ff] hover:text-white transition"
                >
                  <FaSearch />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Bar */}
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
        </div>
      </div>

      {/* Orb animation */}
      <div className="orb absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#104c80]/20 via-white/10 to-black/10 blur-3xl pointer-events-none transition-transform duration-100 ease-out"></div>
    </footer>
  );
}
