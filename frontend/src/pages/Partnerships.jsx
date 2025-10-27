import React from "react";
import { Scale, Gamepad2, Cpu, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const iconMap = {
  Scale: <Scale className="w-10 h-10 text-[#0d008e]" />,
  Gamepad2: <Gamepad2 className="w-10 h-10 text-[#0d008e]" />,
  Cpu: <Cpu className="w-10 h-10 text-[#0d008e]" />,
};

const Partnerships = () => {
  const { t } = useTranslation("partnerships");

  const partners = t("partnersSection.partners", { returnObjects: true });
  const cis = t("cisMembership", { returnObjects: true });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#cce0f5] py-20 px-6 md:px-16 lg:px-28 overflow-hidden">
      {/* Soft Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(16,76,128,0.15),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(16,76,128,0.15),transparent_70%)] blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-24 z-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-[#104c80] mb-6 tracking-tight"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {t("partnersSection.header")}
        </motion.h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          {t("partnersSection.subHeader")}
        </p>
      </motion.div>

      {/* Partners Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            whileHover={{
              y: -10,
              scale: 1.02,
              boxShadow: "0 15px 35px rgba(16,76,128,0.15)",
            }}
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl overflow-hidden border border-indigo-100 transition-all duration-500 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={partner.image}
                alt={partner.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080156]/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-5 text-white flex items-center gap-3">
                <div className="bg-white/60 p-3 rounded-full backdrop-blur-md flex items-center justify-center shadow-md">
                  {iconMap[partner.icon] || <Cpu className="w-10 h-10 text-[#0d008e]" />}
                </div>
                <h3 className="text-lg font-semibold tracking-tight drop-shadow-md">
                  {partner.title}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between flex-grow p-6">
              <p className="text-gray-700 text-justify leading-normal flex-grow">
                {partner.description}
              </p>

              <motion.a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4, color: "#104c80" }}
                className="mt-5 inline-flex items-center text-[#080156] font-semibold gap-2 hover:underline"
              >
                <ExternalLink className="w-5 h-5" />
                {partner.linkLabel}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CIS Membership Section */}
     <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="lg:mt-20 mt-14 md:mt-32 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#104c80]/10 relative overflow-hidden group"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 items-center">
    {/* Image */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="h-full flex justify-center items-center bg-[#f8fbff] p-1 sm:p-6 md:p-8"
    >
      <img
        src={cis.image}
        alt="CIS Membership"
        className="object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-[350px] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
      />
    </motion.div>

    {/* Content */}
    <div className="p-6 sm:p-8 md:p-10 text-center md:text-left">
      <h3 className="text-2xl sm:text-3xl font-bold text-[#104c80] mb-3 sm:mb-4">
        🇬🇧 {cis.title}
      </h3>

      {cis.description.map((para, i) => (
        <p
          key={i}
          className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3"
        >
          {para}
        </p>
      ))}
    </div>
  </div>
</motion.div>

    </div>
  );
};

export default Partnerships;
