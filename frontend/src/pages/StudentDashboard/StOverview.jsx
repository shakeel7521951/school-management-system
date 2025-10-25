import React from "react";
import { FileText, MessageSquare, Bell } from "lucide-react";
import WelcomeCard from "../../components/Studentdashboard/StOverview/WelcomeCard";
import StatCard from "../../components/Studentdashboard/StOverview/StatCard";
import Announcements from "../../components/Studentdashboard/StOverview/Announcements";

import { motion } from "framer-motion";

const StOverview = () => {
  const studentName = "Sara";
  const totalDocuments = 24;
  const totalComplaints = 5;
  const announcements = [
    "Exam schedule released for Fall 2025",
    "Holiday on 15th September",
    "New course material uploaded for Physics",
  ];

  return (
    <div
      className="md:ml-20 lg:ml-64 p-8 min-h-screen font-sans 
                 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200"
    >
      {/* ✅ Welcome Section */}
      <WelcomeCard studentName={studentName} />

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <StatCard
          icon={<FileText className="text-white" size={32} />}
          title="Documents Uploaded"
          value={totalDocuments}
          delay={0.1}
          animation="from-[#1a4480] to-[#3a70c4] hover:from-[#163668] hover:to-[#2d5ca5]"
        /> */}
        <StatCard
          icon={<MessageSquare className="text-white" size={32} />}
          title="Complaints Submitted"
          value={totalComplaints}
          delay={0.2}
          animation="from-[#1a4480] to-[#4686d1] hover:from-[#163668] hover:to-[#356fb8]"
        />
        {/* <StatCard
          icon={
            <motion.div
              animate={{
                rotate: [0, -15, 15, -10, 10, -5, 5, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Bell className="text-white" size={32} />
            </motion.div>
          }
          title="New Notifications"
          value={announcements.length}
          delay={0.3}
          animation="from-[#1a4480] to-[#5a97e0] hover:from-[#163668] hover:to-[#4179c1]"
        /> */}
      </div>

      {/* ✅ Announcements Section */}
      {/* <Announcements announcements={announcements} /> */}
    </div>
  );
};

export default StOverview;
