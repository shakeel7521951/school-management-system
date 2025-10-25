import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Bell } from "lucide-react";

const TeacherStats = () => {
  const stats = [
    {
      title: "My Documents",
      value: 12,
      icon: <FileText size={28} className="text-white" />,
      delay: 0.1,
    },
    {
      title: "Approved Docs",
      value: 7,
      icon: <CheckCircle size={28} className="text-white" />,
      delay: 0.2,
    },
    {
      title: "Notifications",
      value: 3,
      icon: <Bell size={28} className="text-white" />,
      delay: 0.3,
      shake: true,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          className="bg-gradient-to-r from-[#1a4c80] to-[#2360a8] rounded-3xl shadow-lg p-6 
                     flex items-center gap-5 cursor-pointer transform transition-all duration-300 
                     hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-blue-200"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: stat.delay }}
        >
          {/* Icon Wrapper */}
          {stat.shake ? (
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
              {stat.icon}
            </motion.div>
          ) : (
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
              {stat.icon}
            </div>
          )}

          {/* Text */}
          <div>
            <p className="text-white/80 font-medium">{stat.title}</p>
            <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TeacherStats;
