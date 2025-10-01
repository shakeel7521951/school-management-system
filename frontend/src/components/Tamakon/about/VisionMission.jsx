import React from 'react'
import {motion} from "framer-motion"
import { useTranslation } from 'react-i18next'


const VisionMission = () => {
  const {t} = useTranslation("aboutUs")
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
         {t("sections.vision.title")}
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-1 left-0 h-1 bg-[#104c80] rounded-full"
          ></motion.span>
        </h3>
        <p className="leading-relaxed text-gray-700">
         {t("sections.vision.content")}
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
         {t("sections.mission.title")}
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute -bottom-1 left-0 h-1 bg-green-700 rounded-full"
          ></motion.span>
        </h3>
        <p className="leading-relaxed text-gray-700">
          {t("sections.mission.content")}
                 </p>
      </motion.div>
    </div>
  )
}

export default VisionMission;