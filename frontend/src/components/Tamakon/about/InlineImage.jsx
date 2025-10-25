import { motion } from "framer-motion";

const InlineImage = ({ src, alt }) => {
  return (
    <motion.div
      className="flex justify-center"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-3 bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-5xl overflow-hidden">
        {/* Decorative Frame */}
        <div className="absolute inset-0 rounded-2xl border-4 border-[#104c80]/30 -z-10 translate-x-2 translate-y-2"></div>

        {/* 🎥 Video Only */}
        <video
          src={src}
          muted
          autoPlay
          loop
          playsInline
          poster="/images/hero-bg.jpeg"
          className="rounded-xl shadow-md w-full h-[400px] object-cover"
        >
          Sorry, your browser doesn’t support embedded videos.
        </video>
      </div>
    </motion.div>
  );
};

export default InlineImage;
