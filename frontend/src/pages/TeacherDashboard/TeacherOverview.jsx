import React from 'react'
import { Bell, ArrowRight } from 'lucide-react'
import TeacherStats from '../../components/teacherDashboard/teacherOverview/TeacherStat'
import WelcomeBanner from '../../components/teacherDashboard/teacherOverview/WelcomeBanner'
import { motion } from 'framer-motion'

const TeacherOverview = () => {
  const announcements = [
    { id: 1, title: 'Staff meeting on Monday', date: 'Sep 11, 2025' },
    { id: 2, title: 'Submit grades by Friday', date: 'Sep 9, 2025' }
  ]

  return (
    <div className='p-6 lg:ml-64 md:ml-20 bg-gray-50 min-h-screen'>
      {/* Welcome Section */}
      <div className='mb-10'>
        <WelcomeBanner name='Daniya' />
      </div>

      {/* Stats Section */}
      <TeacherStats />

      {/* Announcements Section */}
      {/* Announcements Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white shadow rounded-2xl p-6'
      >
        <h3 className='text-xl font-semibold text-[#104c80] mb-5 flex items-center gap-2'>
          <Bell size={22} /> Announcements
        </h3>
        <ul className='space-y-5'>
          {announcements.map((a, index) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className='group relative p-6 border rounded-xl bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc]
                   hover:from-[#e8f2fc] hover:to-[#d9eafa] shadow-sm hover:shadow-lg
                   transition-all duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1'
            >
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-semibold text-gray-800 text-base md:text-lg group-hover:text-[#104c80] transition-colors'>
                    {a.title}
                  </p>
                  <p className='text-gray-500 text-sm md:text-base mt-1'>
                    {a.date}
                  </p>
                </div>
                {/* Arrow animates on hover */}
                <ArrowRight
                  size={20}
                  className='text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 
                       transition-all duration-500'
                />
              </div>

              {/* Animated border glow on hover */}
              <span className='absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#104c80]/30 transition-all duration-500 pointer-events-none'></span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default TeacherOverview
