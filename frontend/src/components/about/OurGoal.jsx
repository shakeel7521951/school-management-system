import React from 'react'
import { Target, Smartphone, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const OurGoal = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 px-6 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-blue-200/40 opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Text & Highlights */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a4480] mb-6 relative inline-block">
            Our Goal
          </h2>

          {/* Paragraph */}
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
            At{' '}
            <span className="font-semibold text-[#1a4480]">
              Al Tamkon Comprehensive School
            </span>
            , our goal is to provide a{' '}
            <span className="font-semibold text-[#1a4480]">
              secure and transparent digital environment
            </span>{' '}
            for managing{' '}
            <span className="font-semibold text-[#1a4480]">
              document workflows and complaint systems
            </span>
            . We ensure that processes are{' '}
            <span className="font-semibold text-[#1a4480]">structured</span>,{' '}
            <span className="font-semibold text-[#1a4480]">accessible</span>, and{' '}
            <span className="font-semibold text-[#1a4480]">bilingual</span> so
            that students, parents, staff, and administrators can collaborate
            effectively. This aligns with{' '}
            <span className="font-semibold text-[#1a4480]">
              Qatar’s National Vision 2030
            </span>{' '}
            by promoting innovation, accountability, and inclusive growth.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {[
              { icon: Target, label: 'Structured Workflow' },
              { icon: Smartphone, label: 'Mobile & Web Access' },
              { icon: Globe, label: 'Bilingual (Arabic & English)' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/80 rounded-lg p-3 shadow-md border border-yellow-100
                 hover:shadow-lg hover:-translate-y-1 hover:border-yellow-400 transition duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-yellow-100 mr-3">
                  <item.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="font-semibold text-gray-900 text-base">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          className="flex justify-center md:justify-end relative"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Decorative blob behind */}
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-blue-300/50 rounded-3xl rotate-12 blur-2xl opacity-50 hidden md:block"></div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative p-3 rounded-3xl bg-gradient-to-tr from-blue-100 via-white to-blue-200 shadow-2xl"
          >
            <img
              src="./images/academics.jpg"
              alt="School digital system with students"
              className="relative rounded-2xl object-cover w-full max-w-xl 
              border-4 border-white shadow-xl"
            />
            <div className="absolute inset-0 rounded-2xl ring-2 ring-[#1a4480]/30 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default OurGoal