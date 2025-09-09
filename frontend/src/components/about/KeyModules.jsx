import React from 'react'
import { FaUsers, FaClipboardList, FaFileAlt, FaChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'

const KeyModules = () => {
  const modules = [
    { icon: FaUsers, title: 'Visitors Management', desc: 'Smart digital check-in/out with instant notifications and reporting to enhance school security.' },
    { icon: FaClipboardList, title: 'Complaints & Feedback', desc: 'A transparent portal for parents, staff, and students with real-time status tracking for complete accountability.' },
    { icon: FaFileAlt, title: 'Document Workflow', desc: 'Automated approvals, secure e-signatures, and digital archiving for a paperless and efficient school system.' },
    { icon: FaChartBar, title: 'Analytics & Reports', desc: 'Interactive dashboards with exportable insights, empowering leadership with data-driven decision making.' }
  ]

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-[#1a4480]" data-aos="zoom-in">
        Key Modules
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {modules.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              className="group p-8 bg-white rounded-3xl shadow-md text-center border border-yellow-100
                         transition-transform transform hover:-translate-y-2 duration-300 hover:shadow-2xl
                         hover:bg-gradient-to-br hover:from-white hover:to-blue-50 cursor-pointer relative overflow-hidden"
              data-aos="flip-left"
              data-aos-delay={i * 200}
            >
              {/* Icon with circle background and glow */}
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 rounded-full
                              bg-gradient-to-tr from-yellow-50 to-yellow-100 transition-all duration-300
                              group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-yellow-100
                              group-hover:scale-110">
                <Icon className="text-4xl text-[#1a4480] transition-colors duration-300 group-hover:text-[#d08700]" />
              </div>

              <h3 className="text-lg font-semibold mb-3 text-[#1a4480]">{item.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>

              {/* Subtle hover glow */}
              <span className="absolute inset-0 rounded-3xl bg-yellow-200/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default KeyModules
