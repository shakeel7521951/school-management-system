import React from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const Announcements = ({ announcements }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl p-6 mt-10 border-t-4 border-[#1a4480] 
                 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-[#1a4480] mb-6">
        Recent Announcements
      </h2>
      <ul className="space-y-4">
        {announcements.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200 
                       shadow-sm hover:shadow-md hover:border-[#1a4480] transition-all duration-300 
                       hover:bg-[#1a4480]/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            {/* Shaking Bell */}
            <motion.div
              className="flex-shrink-0 bg-[#1a4480]/10 p-3 rounded-full"
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }} // shake pattern
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <Bell className="text-[#1a4480]" size={22} />
            </motion.div>

            <p className="text-gray-700 font-medium">{item}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Announcements;
