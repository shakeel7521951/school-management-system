import React from 'react'
import {
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaChartBar,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const KeyModules = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      {/* Section Heading */}
      <h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-[#1a4480]"
        data-aos="zoom-in"
      >
        Key Modules
      </h2>

      {/* Modules Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <FaUsers className="text-5xl text-[#1a4480] mx-auto mb-4" />,
            title: 'Visitors Management',
            desc: 'Smart digital check-in/out with instant notifications and reporting to enhance school security.'
          },
          {
            icon: (
              <FaClipboardList className="text-5xl text-[#1a4480] mx-auto mb-4" />
            ),
            title: 'Complaints & Feedback',
            desc: 'A transparent portal for parents, staff, and students with real-time status tracking for complete accountability.'
          },
          {
            icon: (
              <FaFileAlt className="text-5xl text-[#1a4480] mx-auto mb-4" />
            ),
            title: 'Document Workflow',
            desc: 'Automated approvals, secure e-signatures, and digital archiving for a paperless and efficient school system.'
          },
          {
            icon: (
              <FaChartBar className="text-5xl text-[#1a4480] mx-auto mb-4" />
            ),
            title: 'Analytics & Reports',
            desc: 'Interactive dashboards with exportable insights, empowering leadership with data-driven decision making.'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-8 bg-white rounded-2xl shadow-lg text-center 
             transition-transform duration-500 ease-in-out 
             hover:scale-105 hover:shadow-2xl 
             hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-yellow-100 hover:border-[#facc15]"
            data-aos="flip-left"
            data-aos-delay={i * 200}
          >
            {item.icon}
            <h3 className="text-lg font-semibold mb-3 text-[#1a4480]">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default KeyModules
