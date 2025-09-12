import React from 'react'
import {
  FaUsers,
  FaClipboardList,
  FaFileAlt,
  FaChartBar,
  FaChalkboardTeacher,
  FaSchool
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const Deliverables = () => {
  const items = [
    {
      icon: FaUsers,
      title: 'Role-Based Access',
      desc: 'Secure access control with customizable roles and permissions across modules.'
    },
    {
      icon: FaClipboardList,
      title: 'Complaints Management',
      desc: 'Confidential portal with restricted committee access, ensuring transparency and accountability.'
    },
    {
      icon: FaFileAlt,
      title: 'Document Workflow',
      desc: 'Automated approval cycle (User → Planning → GM Office) with rejection loop and digital archiving.'
    },
    {
      icon: FaChartBar,
      title: 'Reports & Analytics',
      desc: 'Dashboards with filters, drill-down insights, and exportable reports for data-driven decisions.'
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Training & Onboarding',
      desc: 'Bilingual (Arabic & English) training sessions and continuous support for smooth adoption.'
    },
    {
      icon: FaSchool,
      title: 'Multi-Branch Support',
      desc: 'Scalable platform designed to manage multiple campuses and schools across Qatar.'
    }
  ]

  return (
    <section className='max-w-7xl mx-auto py-20 px-6'>
      <motion.h2
        className='text-4xl md:text-5xl font-extrabold text-center mb-14 text-[#1a4480]'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Deliverables
      </motion.h2>

      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              className='group p-8 bg-white rounded-3xl shadow-md hover:shadow-2xl text-center border border-yellow-100
                 transition-transform transform hover:-translate-y-2 duration-300 cursor-pointer relative overflow-hidden'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Icon with circle background */}
              <div className='w-20 h-20 flex items-center justify-center mx-auto mb-6 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-50 
                              transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-yellow-100'>
                <Icon className='text-4xl text-[#1a4480] transition-colors duration-300 group-hover:text-[#d08700]' />
              </div>

              <h3 className='text-xl font-semibold mb-2 text-[#1a4480] group-hover:text-[#1a4480]'>
                {item.title}
              </h3>
              <p className='text-gray-700 text-sm leading-relaxed'>
                {item.desc}
              </p>

              {/* Subtle glow effect */}
              <span className='absolute inset-0 rounded-3xl bg-yellow-200/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none'></span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Deliverables
