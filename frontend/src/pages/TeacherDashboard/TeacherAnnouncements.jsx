import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementList from "../../components/teacherDashboard/teacherAnnouncements/AnnouncementList";

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Staff meeting on Monday",
      description: "All staff must attend at 10 AM.",
      date: "Sep 11, 2025",
    },
    {
      id: 2,
      title: "Submit grades by Friday",
      description: "Ensure all grades are submitted online before 5 PM.",
      date: "Sep 9, 2025",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setAnnouncements([
      {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        description: newAnnouncement.description,
        date: today,
      },
      ...announcements,
    ]);

    setNewAnnouncement({ title: "", description: "" });
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:ml-64 md:ml-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a4480] tracking-tight">
          Announcements
        </h2>

       
      </motion.div>

      {/* List */}
      <AnnouncementList announcements={announcements} />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AnnouncementModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            newAnnouncement={newAnnouncement}
            setNewAnnouncement={setNewAnnouncement}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherAnnouncements;
