import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function FooterSearch({ sectionVariants, handleSearch, query, setQuery }) {
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
  );
}
