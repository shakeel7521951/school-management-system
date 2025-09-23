import { motion } from "framer-motion";

const  Section=({ title, children, direction = "left" })=> {
  const animation =
    direction === "left"
      ? { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } }
      : direction === "right"
      ? { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } }
      : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <motion.div
      {...animation}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#104c80] relative inline-block">
        {title}
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute -bottom-2 left-0 h-1 bg-[#104c80] rounded-full"
        ></motion.span>
      </h2>
      {children}
    </motion.div>
  );
}



export default Section;
