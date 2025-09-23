import React from "react";
import { motion } from "framer-motion";

export default function DirectorManagerMessage() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] sm:h-[55vh] md:h-[50vh] lg:h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4 sm:px-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-xl tracking-wide">
            Director Manager Message
          </h1>
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-100 drop-shadow">
            مدرسة التمكن الشاملة / Director Manager Message
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#104c80] mb-6 sm:mb-8 leading-snug">
              Welcome to Tamakon School specializing in learning disabilities
            </h2>
            <div className="space-y-4 px-3 lg:px-0 sm:space-y-5 text-gray-700 leading-relaxed text-justify text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.05rem]">
              <p>
                Welcome to our school, where we aim to fulfill the vision and
                mission we have set for providing outstanding and supportive
                education for all our students. We believe in the importance of
                empowering students facing learning difficulties and strive to
                create an inclusive educational environment that helps them
                succeed.
              </p>
              <p>
                At Empower School, we seek to offer a unique educational
                experience that combines high quality and individual attention.
                We are committed to developing the skills and abilities of each
                student, encouraging independence and self-reliance. We ensure
                that every student feels a sense of belonging and support within
                our school community.
              </p>
              <p>
                Our website reflects our commitment to providing accurate and
                valuable information for parents and students. We encourage you
                to explore our website to learn more about our educational
                programs, extracurricular activities, and educational
                opportunities at our school.
              </p>
              <p>
                We appreciate your ongoing support and trust in us. We look
                forward to embarking on a new journey filled with challenges and
                achievements together. Empower Inclusive School is always open
                to you, and we are here to help you achieve your educational
                goals.
              </p>
              <p>
                Thank you once again, and welcome to the world of excellence and
                inclusive education!
              </p>
            </div>

            {/* Signature */}
            <div className="mt-6 sm:mt-8 lg:mt-10">
              <p className="text-lg sm:text-xl font-semibold text-[#104c80]">
                Director Manager
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Mona Almolla
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
              src="./images/hero-bg.jpeg"
              alt="Director Manager Mona Almolla"
              className="rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover ring-4 ring-[#104c80]/20"
              style={{ height: "450px", maxHeight: "70vh" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
