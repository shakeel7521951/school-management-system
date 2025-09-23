import React from 'react'
import {motion} from "framer-motion"

const VisionMission = () => {
  return (
     <div className="grid md:grid-cols-2 gap-10">
      {/* Vision */}
      <motion.div
        className="bg-gradient-to-br from-[#104c80]/10 to-blue-50 p-8 rounded-2xl shadow hover:shadow-2xl transition hover:-translate-y-1"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-3 text-[#104c80] relative inline-block">
          Our Vision
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-1 left-0 h-1 bg-[#104c80] rounded-full"
          ></motion.span>
        </h3>
        <p className="leading-relaxed text-gray-700">
          The leading school in empowering multiple intelligences and
          capabilities, providing specialized educational and comprehensive
          rehabilitative services with professional competencies, in accordance
          with national and international standards, in commitment to Qatar’s
          vision 2030.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        className="bg-gradient-to-br from-green-50 to-[#104c80]/10 p-8 rounded-2xl shadow hover:shadow-2xl transition hover:-translate-y-1"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-3 text-green-700 relative inline-block">
          Our Mission
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-1 left-0 h-1 bg-green-700 rounded-full"
          ></motion.span>
        </h3>
        <p className="leading-relaxed text-gray-700">
          Al Tamakon comprehensive School is a leader in enabling multiple
          intelligences and capabilities, where we provide comprehensive
          educational and rehabilitative services with high professional
          competencies. We apply national and international standards to ensure
          distinguished education that enhances students’ development in all
          academic and social aspects, with a focus on innovation and global
          citizenship, in commitment to Qatar’s vision 2030.
        </p>
      </motion.div>
    </div>
  )
}

export default VisionMission;