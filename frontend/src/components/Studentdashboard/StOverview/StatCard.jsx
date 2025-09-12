import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const StatCard = ({ icon, title, value, delay, animation }) => {
  // Check if icon is Bell
  const isBell = icon.type === Bell;

  return (
    <motion.div
      className={`bg-gradient-to-r ${animation} rounded-3xl shadow-lg p-6 
                  flex items-center gap-5 cursor-pointer transform transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-blue-200`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay }}
    >
      {/* Icon wrapper */}
      {isBell ? (
        // Shaking Bell
        <motion.div
          className="bg-white/20 p-3 rounded-full backdrop-blur-md"
          animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ) : (
        // Normal icon (no shake)
        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
          {icon}
        </div>
      )}

      {/* Text Section */}
      <div>
        <p className="text-white/80 font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-white">{value}</h2>
      </div>
    </motion.div>
  );
};

export default StatCard;
