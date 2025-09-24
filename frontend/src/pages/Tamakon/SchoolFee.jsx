import React from 'react'
import {motion} from "framer-motion"
const SchoolFee = () => {
  return (
     <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh]  bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-xl tracking-wide">
         School Fees

          </h1>
          <p className="text-lg md:text-2xl font-medium text-gray-100 drop-shadow">
      مدرسة التمكن الشاملة / School Fees
          </p>
        </motion.div>
      </section>
      <div className='h-[100px]'>

      </div>

     
    </div>
  )
}

export default SchoolFee