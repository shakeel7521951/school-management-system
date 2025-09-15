import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import ComplaintModal from "../../components/teacherDashboard/teacherComplaints/ComplaintModal";
import ComplaintTable from "../../components/teacherDashboard/teacherComplaints/ComplaintTable";
import ComplaintDetailModal from "../../components/teacherDashboard/teacherComplaints/ComplaintDetailModal";

const workflow = ["Submitted", "Under Review", "Action Taken", "Closed"];

const TeacherComplaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      employeeName: "Daniya",
      jobTitle: "Physics Teacher",
      department: "Science",
      date: "2025-09-01",
      type: "Work Environment",
      severity: "Urgent",
      details: "Projector in Room 12 is not working properly.",
      impact: "Performance",
      expectedAction: "Replace projector immediately",
      status: "Under Review",
      complaintDetails:
        "The faulty projector has been disrupting lectures and delaying course coverage. Multiple requests have already been made but no replacement has been provided.",
    },
    {
      id: 2,
      employeeName: "Daniya",
      jobTitle: "Physics Teacher",
      department: "Science",
      date: "2025-09-05",
      type: "Stress",
      severity: "Follow-up",
      details: "Frequent internet issues in the library.",
      impact: "Stress",
      expectedAction: "Fix WiFi connection",
      status: "Action Taken",
      complaintDetails:
        "Students often complain about not being able to access online journals. The issue has been reported several times, but the IT team has not resolved it yet.",
    },
    {
      id: 3,
      employeeName: "Daniya",
      jobTitle: "Physics TEcaher",
      department: "Science",
      date: "2025-09-08",
      type: "Management",
      severity: "Serious",
      details: "Unclear task allocation causing confusion.",
      impact: "Health",
      expectedAction: "Clarify responsibilities",
      status: "Under Review",
      complaintDetails:
        "Team members have been facing unnecessary stress due to unclear instructions. A recent meeting addressed some of these issues, but proper documentation is still required.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // ✅ aligned newComplaint with existing structure
  const [newComplaint, setNewComplaint] = useState({
    employeeName: "",
    jobTitle: "",
    department: "",
    date: "",
    type: "",
    severity: "Normal",
    details: "",
    impact: "",
    expectedAction: "",
    complaintDetails: "",
  });

  const statusStyles = {
    Submitted: "bg-gray-100 text-gray-700 border-gray-300",
    "Under Review": "bg-blue-100 text-blue-700 border-blue-300",
    "Action Taken": "bg-yellow-100 text-yellow-700 border-yellow-300",
    Closed: "bg-green-100 text-green-700 border-green-300",
  };

  const statusIcons = {
    Submitted: <Clock size={16} />,
    "Under Review": <AlertCircle size={16} />,
    "Action Taken": <Clock size={16} />,
    Closed: <CheckCircle2 size={16} />,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaint.employeeName.trim() || !newComplaint.details.trim()) return;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    setComplaints([
      {
        id: complaints.length + 1,
        ...newComplaint,
        date: today,
        status: "Submitted",
      },
      ...complaints,
    ]);

    // Reset form after submission
    setNewComplaint({
      employeeName: "",
      jobTitle: "",
      department: "",
      date: "",
      type: "",
      severity: "Normal",
      details: "",
      impact: "",
      expectedAction: "",
      complaintDetails: "",
    });

    setShowModal(false);
  };

  // Move complaint to next stage
  const handleNextStage = (id) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const currentIndex = workflow.indexOf(c.status);
          const nextStatus = workflow[currentIndex + 1] || c.status;
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    setSelectedComplaint(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:ml-64 bg-gray-50 min-h-screen md:ml-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a4480] tracking-tight">
          Complaints
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition font-medium"
        >
          + Submit Complaint
        </button>
      </motion.div>

      <div className="overflow-x-auto">
        <ComplaintTable
          complaints={complaints}
          statusStyles={statusStyles}
          statusIcons={statusIcons}
          setSelectedComplaint={setSelectedComplaint}
        />
      </div>

      <AnimatePresence>
        {showModal && (
          <ComplaintModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            newComplaint={newComplaint}
            setNewComplaint={setNewComplaint}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedComplaint && (
          <ComplaintDetailModal
            complaint={selectedComplaint}
            statusStyles={statusStyles}
            statusIcons={statusIcons}
            onClose={() => setSelectedComplaint(null)}
            onNextStage={handleNextStage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherComplaints;
