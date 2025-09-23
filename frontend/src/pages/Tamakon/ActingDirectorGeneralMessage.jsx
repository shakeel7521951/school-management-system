import React from 'react'
import { motion } from "framer-motion"

const ActingDirectorGeneralMessage = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[55vh] bg-cover bg-center flex items-center justify-center"
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
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-xl tracking-wide">
            Acting Director General Message
          </h1>
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-100 drop-shadow">
            مدرسة التمكن الشاملة / Acting Director General Message
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#104c80] mb-6 sm:mb-8 leading-snug">
              Welcome to Tamakon Comprehensive School
            </h2>
            <div className="space-y-4 sm:space-y-5 px-3 lg:px-0 text-gray-700 leading-relaxed text-justify text-[1rem] sm:text-[1.05rem] md:text-[1.1rem]">
              <p>
                Welcome to our wonderful school, where we embody our vision and mission of
                providing exceptional and supportive education for all our students. As the
                Acting General Manager, I am eagerly looking forward to working with the
                school team and parents to achieve our common goals.
              </p>
              <p>
                During this transitional period, our school will remain committed to
                delivering high-quality education and individual support for students facing
                learning challenges. We believe in the importance of preparing students for
                a successful and stable future, and we are working diligently towards that.
              </p>
              <p>
                Our website is your gateway to the world of Empower School. It contains
                detailed information about our educational programs, extracurricular
                activities, and the latest news and events at the school. We encourage you
                to explore it and use it as a valuable resource to learn more about what we
                offer.
              </p>
              <p>
                Thank you for your continuous support and collaboration. Empower
                Comprehensive School is open for communication and interaction, and we are
                here to meet your needs and address your inquiries. Please do not hesitate
                to reach out to us if you have any questions or suggestions.
              </p>
              <p>
                I wish everyone a successful and progressive academic year, and I look
                forward to continuous collaboration with all of you.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 sm:mt-10">
              <p className="text-lg sm:text-xl font-semibold text-[#104c80]">
                Acting Director General
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Dr. Hind Alrabah
              </p>
              <div className="w-16 sm:w-20 h-1 bg-[#104c80] mt-2 rounded-full"></div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="./images/hind.jpg"
              alt="Acting Director Dr.Hind"
              className="rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover ring-4 ring-[#104c80]/20"
              style={{ height: "500px", maxHeight: "80vh" }} // responsive height
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ActingDirectorGeneralMessage
