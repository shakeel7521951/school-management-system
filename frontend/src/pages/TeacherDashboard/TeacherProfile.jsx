import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import ProfileCard from "../../components/teacherDashboard/teacherProfile/ProfileCard";
import EditProfileModal from "../../components/teacherDashboard/teacherProfile/EditProfileModal";

const TeacherProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Daniya",
    role: "Senior Science Teacher",
    email: "daniya@gmail.com",
    phone: "+123 456 789",
    bio: "Passionate educator with over 10 years of experience in teaching science subjects. Dedicated to creating engaging learning environments and helping students excel.",
    stats: {
      classes: 120,
      announcements: 35,
      experience: "10+",
    },
    image: "./images/teacher.jpg",
  });

  return (
    <div className="p-4 sm:p-6 md:ml-20 lg:ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480] tracking-tight">
          Teacher Profile
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 w-48 sm:w-auto px-4 py-2 bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white rounded-xl shadow-md hover:scale-105 transition-transform text-sm sm:text-base"
        >
          <Edit size={18} />
          Edit Profile
        </button>
      </motion.div>

      {/* Profile Card */}
      <ProfileCard profile={profile} />

      {/* Edit Modal */}
      {showModal && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TeacherProfile;
