import { motion } from "framer-motion";

const InlineImage=({ src, alt })=> {
  return (
    <motion.div
      className="flex justify-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-3 bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-5xl">
        <div className="absolute inset-0 rounded-2xl border-4 border-[#104c80]/30 -z-10 translate-x-2 translate-y-2"></div>
        <img
          src={src}
          alt={alt}
          className="rounded-xl shadow-md w-full h-[400px] object-cover"
        />
      </div>
    </motion.div>
  );
}


export default InlineImage
