import { useEffect } from "react";
import { FaGithub, FaYoutube, FaFacebookF, FaArrowRight, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const contacts = [
    {
      label: "Email",
      value: "john.doe@example.com",
      href: "john.doe@example.com",
      icon: <FaEnvelope className="text-indigo-300" />,
      gradient: "from-indigo-400 to-purple-400",
    },
    {
      label: "Phone",
      value: "+1-202-555-0187",
      href: "tel:+1-202-555-0187",
      icon: <FaPhoneAlt className="text-indigo-300" />,
      gradient: "from-indigo-400 to-purple-400",
    },
    {
      label: "Location",
      value: "221B Baker Street, London, UK",
      href: "#",
      icon: <FaMapMarkerAlt className="text-indigo-300" />,
      gradient: "from-indigo-400 to-purple-400",
    },
  ];

  const quickLinks = ["Home", "About","Events","Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookies"];

  useEffect(() => {
    const orb = document.querySelector(".orb");
    
    const handleMove = (e) => {
      if (orb) {
        requestAnimationFrame(() => {
          orb.style.left = `${e.clientX}px`;
          orb.style.top = `${e.clientY}px`;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-600 rounded-full filter blur-3xl animate-float1"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl animate-float2"></div>
        <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-indigo-500 rounded-full filter blur-3xl animate-float3"></div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform duration-500 hover:rotate-12">
                <span className="text-xl font-bold text-white">MI</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300">
                Mindora
              </h2>
            </div>
            <p className="text-indigo-100 mb-6 leading-relaxed">
              Inspiring young minds through knowledge, creativity, discipline, and lifelong learning.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: <FaYoutube />, color: "hover:from-red-600 hover:to-red-800", label: "YouTube" },
                { icon: <FaLinkedin />, color: "hover:from-indigo-700 hover:to-indigo-900", label: "LinkedIn" },
                { icon: <FaTwitter />, color: "hover:from-indigo-500 hover:to-purple-700", label: "Twitter" },
                { icon: <FaFacebookF />, color: "hover:from-indigo-600 hover:to-indigo-800", label: "Facebook" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 border border-indigo-600 rounded-lg bg-indigo-800 flex items-center justify-center  transition-all duration-300 hover:bg-gradient-to-r ${item.color} 
                             hover:scale-110 hover:shadow-lg`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="flex items-center text-indigo-200 hover:text-white transition-all duration-300 group"
                  >
                    <FaArrowRight className="mr-2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative group-hover:translate-x-2 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {contacts.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 group">
                  <span className="text-lg mt-1 p-2 bg-indigo-800 rounded-lg group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 border border-indigo-600">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-indigo-200">{item.label}</p>
                    <a
                      href={item.href}
                      className="relative text-white hover:text-indigo-300 transition-colors duration-300 inline-block py-1"
                    >
                      {item.value}
                      <span
                        className={`absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`}
                      ></span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
            </h3>
            <p className="text-indigo-100 mb-4">
              Subscribe to my newsletter for the latest updates and insights.
            </p>
            <form className="mt-4 space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-indigo-800 border border-indigo-700 rounded-lg py-3 px-4 placeholder-indigo-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span>Subscribe</span>
                <FaArrowRight className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="mt-16 pt-8 border-t border-indigo-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Mindora. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-indigo-300 hover:text-white hover:underline transition-colors duration-300 text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Orb */}
      <div className="orb absolute w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 filter blur-3xl pointer-events-none transition-transform duration-100 ease-out"></div>

      {/* Animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 15px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(0, -20px) scale(1.05); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}