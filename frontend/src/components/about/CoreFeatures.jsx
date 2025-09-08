import React from 'react'
import { FaCheckCircle } from "react-icons/fa"
import { motion } from "framer-motion"

const CoreFeatures = () => {
  const features = [
    "Visitors Management – Secure check-in/out with instant reports",
    "Complaints & Feedback – Transparent portal for parents & staff",
    "Document Workflow – Approvals, e-signatures & archiving",
    "Analytics & Reports – Dashboards & exportable insights",
    "Training & Onboarding – Smooth adoption with staff training",
    "Multi-Branch Support – Scalable for multiple campuses",
  ]

  return (
    <section
      className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 overflow-hidden"
      data-aos="fade-left"
      data-aos-delay="200"
    >
      {/* Decorative background accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/30 via-transparent to-blue-200/40 opacity-40 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-[#1a4480]"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Core Features
        </motion.h2>

        {/* Features List */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/90 p-8 rounded-2xl shadow-lg border border-yellow-100 
                         hover:shadow-2xl hover:border-[#facc15] hover:bg-gradient-to-br hover:from-white hover:to-blue-50
                         transition-transform duration-500"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {/* Icon with pulse animation */}
              <motion.div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#facc15]/20 text-[#1a4480] mb-5 
                           group-hover:bg-[#facc15] group-hover:text-white transition-colors"
                whileHover={{ scale: 1.15, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <FaCheckCircle className="text-2xl" />
              </motion.div>

              {/* Feature Text */}
              <motion.p
                className="text-gray-800 font-medium leading-relaxed"
                whileHover={{ color: "#1a4480" }}
              >
                {feature}
              </motion.p>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200/20 to-blue-200/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreFeatures
