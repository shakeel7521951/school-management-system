import { motion } from "framer-motion";

export default function FooterBrand({ sectionVariants }) {
  return (
    <motion.div
      className="flex flex-col space-y-4"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-white">
        Al Tamkon Comprehensive School
      </h2>
      <p className="text-white text-[15px] leading-relaxed">
        Al Tamkon Comprehensive School was established in 2008 to meet the
        growing community needs for comprehensive services for students with
        Multiple Intelligences and Abilities. It was the first licensed private
        school for students with special needs in Qatar, providing therapeutic
        education and rehabilitation for males and females across all levels.
      </p>
    </motion.div>
  );
}
