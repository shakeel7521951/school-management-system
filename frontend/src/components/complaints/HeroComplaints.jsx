import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroComplain from '../../assets/herocomplain.webp'
import { Link } from "react-router-dom";
// ✅ Counter component
const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (typeof value === "string" && value.includes("%")) {
      return `${Math.round(latest)}%`;
    } else if (typeof value === "string" && value.includes("/")) {
      return `${(latest / 100).toFixed(1)}/5`;
    } else if (typeof value === "string" && value.toLowerCase().includes("h")) {
      return `${Math.round(latest)}h`;
    }
    return Math.round(latest) + suffix;
  });

  useEffect(() => {
    let target = parseFloat(value);
    if (value.includes("%")) target = parseFloat(value);
    else if (value.includes("/")) target = parseFloat(value) * 100;
    else if (value.toLowerCase().includes("h")) target = parseFloat(value);

    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const HeroComplaints = () => {
  const stats = [
    { value: "24h", label: "Avg. Response Time" },
    { value: "95%", label: "Issues Resolved" },
    { value: "4.8/5", label: "Satisfaction Score" },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      className="relative pt-10 min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
       style={{
    backgroundImage: `url(${heroComplain})`,
  }}
      role="region"
      aria-label="Customer Feedback Hero Section"
    >
      {/* Overlay (improved opacity for readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-navy/60 to-black/70"></div>

      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl  mx-auto px-6 sm:px-8 lg:px-10 py-10 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white/90 mb-6 leading-snug drop-shadow-lg"
        >
          Your 
          <span className="text-transparent ps-3 bg-clip-text bg-gradient-to-r from-[#1e4d80]  via to-[#134b86]">
            Feedback  
          </span>
          Drives Improvement
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-100 font-light mb-10 leading-relaxed"
        >
          We value your experience and are committed to addressing your
          concerns. Share your feedback with us, and let's work together toward
          a better solution.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
         <Link to="/complainform">
          <button
            aria-label="Submit a complaint"
            className="px-8 py-4 rounded-xl bg-white text-[#1A426D] font-bold shadow-lg hover:shadow-2xl hover:scale-105 hover:opacity-90 transition-all duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Submit Complaint
          </button>
         </Link>

         <Link to="/complainstatus">
          <button
            aria-label="View complaint status"
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 hover:opacity-90 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            View Status
          </button>
         </Link>
        </motion.div>

        {/* Stats with counters (fade + scale) */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, ease: "easeOut" },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center p-6 rounded-2xl 
             hover:bg-white/10  hover:scale-105 cursor-default hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white drop-shadow-lg">
                {inView && <Counter value={stat.value} />}
              </div>
              <div className="text-sm text-blue-200/90 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator (fade pulse) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroComplaints;
