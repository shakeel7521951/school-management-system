import React from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

const WelcomeBanner = ({ name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 bg-white/70 backdrop-blur-xl border border-gray-200/60
                 rounded-3xl p-6 shadow-lg flex items-center gap-5"
    >
      {/* Icon */}
      <div className="bg-gradient-to-r from-[#14528B] to-[#1a6bb6] p-4 rounded-2xl shadow-md">
        <User size={36} className="text-white" />
      </div>

      {/* Text */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Welcome back, <span className="text-[#14528B]">{name}</span>
        </h1>
        <p className="mt-1 text-gray-600 text-sm sm:text-base">
          Manage your classes, track student progress, and stay updated with announcements.
        </p>
      </div>
    </motion.div>
  )
}

export default WelcomeBanner
