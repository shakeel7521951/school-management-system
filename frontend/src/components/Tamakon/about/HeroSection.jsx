import { motion } from "framer-motion";

const HeroSection=()=> {
  return (
    <section
      className="relative w-full h-[65vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#104c80]/70"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-4xl mt-14 md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
          About Tamakon
        </h1>
        <p className="text-lg md:text-2xl font-medium drop-shadow">
          مدرسة التمكن الشاملة / About Tamakon
        </p>
      </motion.div>
    </section>
  );
}



export default HeroSection;
