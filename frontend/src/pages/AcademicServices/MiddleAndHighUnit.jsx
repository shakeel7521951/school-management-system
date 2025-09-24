import React from 'react'
import { motion } from 'framer-motion'

const MiddleAndHighUnit = () => {
  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl tracking-wide leading-15">
           Middle and High Unit for Multiple Intelligences and Talents (Boys)
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            مدرسة التمكن الشاملة / Middle and High Unit for Multiple Intelligences and Talents (Boys)

          </p>
        </motion.div>
      </section>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto space-y-6 sm:space-y-8 px-4 lg:px-6 py-10 md:py-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#104c80] mb-4 sm:mb-6 leading-snug text-center">
        Multiple Intelligences – Intermediate and Secondary Stages
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 leading-relaxed text-justify border border-gray-100">
          <p className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] text-gray-700">
            <span className='text-[#104c80]'> Males </span> <br />
          The student studies in this unit within the regular education track (ordinary certificate), following the age-based (ministerial) standards of the Qatari national curriculum, with the provision of arrangements and accommodations tailored to the student’s abilities and needs
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default MiddleAndHighUnit