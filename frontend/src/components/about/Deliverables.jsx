import React from 'react'
import { 
  FaUsers, 
  FaClipboardList, 
  FaFileAlt, 
  FaChartBar, 
  FaChalkboardTeacher, 
  FaSchool 
} from "react-icons/fa";
import { motion } from "framer-motion";

const Deliverables = () => {
  const items = [
    {
      icon: <FaUsers className="text-4xl text-[#1a4480] mb-4" />,
      title: "Visitor Management",
      desc: "Digital gate system with quick check-in/out and instant reporting for enhanced security.",
    },
    {
      icon: <FaClipboardList className="text-4xl text-[#1a4480] mb-4" />,
      title: "Complaints & Feedback",
      desc: "A transparent portal for parents, students, and staff with live tracking of responses.",
    },
    {
      icon: <FaFileAlt className="text-4xl text-[#1a4480] mb-4" />,
      title: "Document Workflow",
      desc: "Smart approvals, secure e-signatures, and a powerful search-ready digital archive.",
    },
    {
      icon: <FaChartBar className="text-4xl text-[#1a4480] mb-4" />,
      title: "Analytics & Reports",
      desc: "Interactive dashboards with exportable insights for informed decision-making.",
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-[#1a4480] mb-4" />,
      title: "Training & Onboarding",
      desc: "Comprehensive onboarding and hands-on training sessions for staff success.",
    },
    {
      icon: <FaSchool className="text-4xl text-[#1a4480] mb-4" />,
      title: "Multi-Branch Support",
      desc: "Scalable system designed to manage multiple schools and campuses with ease.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-[#1a4480]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Deliverables
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="p-8 bg-white rounded-2xl shadow-lg text-center border border-yellow-100
                       hover:bg-gradient-to-br hover:from-white hover:to-blue-50 
                       hover:border-[#facc15] 
                       transition transform hover:-translate-y-2 duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2 text-[#1a4480]">{item.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Deliverables;
