import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementList from "../../components/teacherDashboard/teacherAnnouncements/AnnouncementList";

const TeacherNotifications = () => {
  // ✅ General Announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Staff Meeting on Monday",
      description: "All staff must attend at 10 AM.",
      date: "Sep 11, 2025",
      type: "General", // mark it general
    },
    {
      id: 2,
      title: "Submit Grades by Friday",
      description: "Ensure all grades are submitted online before 5 PM.",
      date: "Sep 9, 2025",
      type: "General",
    },
  ]);

  // ✅ Admin requested documents for Teacher
  const [requestedDocs] = useState([
    {
      id: 1,
      title: "Course Outline",
      type: "PDF",
      note: "",
      role: "Teacher",
      requestedBy: "Admin",
    },
    {
      id: 2,
      title: "Students Progress Report",
      type: "PDF",
      note: "",
      role: "Teacher",
      requestedBy: "Admin",
    },
    {
      id: 3,
      title: "Grades Report - Class 8",
      type: "xlsx",
      note: "",
      role: "Teacher",
      requestedBy:"Admin"
    },
     {
    id: 4,
    title: "Attendance Report",
    type: "xlsx",
    note: "",
    role: "Teacher",
    requestedBy: "Admin",
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
        type: "General",
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
          Teacher Dashboard
        </h2>
      </motion.div>

      {/* Admin Document Requests */}
      {requestedDocs.length > 0 && (
        <div className="mb-6 bg-blue-50 border-l-4 border-[#104c80] p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-[#104c80] text-lg mb-2">
            Documents Requested by Admin
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {requestedDocs.map((doc) => (
              <li key={doc.id}>
                <span className="font-medium">{doc.title}</span> ({doc.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* General Announcements */}
      <div className="mb-6">
        <h3 className="text-[#104c80] font-bold text-lg mb-3">General Announcements</h3>
        <AnnouncementList announcements={announcements.filter(a => a.type === "General")} />
      </div>

      
    </div>
  );
};

export default TeacherNotifications;
