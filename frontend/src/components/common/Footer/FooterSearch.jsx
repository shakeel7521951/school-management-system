import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const pages = [
  { id: 1, title: "About Tamakon", path: "/about-tamakon" },
  { id: 2, title: "Our Team", path: "/tamakon-team" },
  { id: 3, title: "Director Message", path: "/director-message" },
  { id: 4, title: "Speech & Language Therapy", path: "/speech-therapy" },
  { id: 5, title: "Nursing Department", path: "/nursing-department" },
  { id: 6, title: "Gallery", path: "/gallery" },
  { id: 7, title: "News", path: "/news" },
  { id: 8, title: "Contact Information", path: "/contact-us" },
  { id: 9, title: "School Fees", path: "/school-fees" },
  { id: 1, title: "Recruitment", path: "/recruitment" },
  { id: 11, title: "FAQs", path: "/faqs" },
  { id: 12, title: "Public Relations Department", path: "/public-relations" },
  { id: 13, title: "Middle and High Unit for Multiple Intelligences (Boys)", path: "/middle-unit" },
  { id: 14, title: "Primary Unit for Multiple Intelligences – Boys and Girls", path: "/primary-unit" },
  { id: 15, title: "Specialized Education Unit", path: "/educational-unit" },
  { id: 16, title: "Financial & Administrative Affairs", path: "/financial-affairs" },
  { id: 17, title: "Vocational & Physical Rehabilitation Department", path: "/vocational-rehabilitation" },
];

export default function FooterSearch({ sectionVariants }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Update filtered results on every keystroke
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const results = pages.filter((page) =>
      page.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
  }, [query]);

  const handleResultClick = (path) => {
    navigate(path);
    setQuery(""); // clear input
    setFilteredResults([]);
  };

  return (
    <motion.div
      className="flex flex-col space-y-4"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Heading */}
      <motion.h3
        className="text-lg font-bold relative inline-block text-white"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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

      {/* Search Form */}
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/10 border border-[#cfe7ff]/40 rounded-xl py-3 px-4 text-white placeholder-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#cfe7ff] focus:border-[#cfe7ff] transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cfe7ff] hover:text-white transition"
        >
          <FaSearch />
        </button>
      </form>

      {/* Live Search Results */}
      {filteredResults.length > 0 && (
        <ul className="bg-white/10 mt-2 rounded-md shadow-md overflow-hidden max-h-60 overflow-y-auto">
          {filteredResults.map((item) => (
            <li
              key={item.id}
              onClick={() => handleResultClick(item.path)}
              className="px-4 py-2 text-white hover:bg-[#104c80] cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
