import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaFacebookF,
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/event" },
    { name: "FeedBack", path: "/complain" },
    { name: "Contact", path: "/contact-us" },
  ];

  const contacts = [
    {
      label: "Email",
      value: "info@qatar-school.com",
      href: "mailto:info@qatar-school.com",
      icon: <FaEnvelope className="text-white" />,
    },
    {
      label: "Phone",
      value: "+974 3000 12345",
      href: "tel:+974300012345",
      icon: <FaPhoneAlt className="text-white" />,
    },
    {
      label: "Location",
      value: "Doha, Qatar",
      href: "#",
      icon: <FaMapMarkerAlt className="text-white" />,
    },
  ];

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
    <footer className="relative bg-gradient-to-r from-[#104c80] via-[#1e3a5f] to-[#0a1a2f] shadow-md text-white overflow-hidden">
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
             
              <h2  className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 tracking-wide hover:scale-105 transition-transform duration-300">Al Tamakon</h2>
            </div>
            <p className="text-gray-200 mb-6">
              Inspiring young minds through knowledge, creativity, discipline,
              and lifelong learning.
            </p>
            {/* Socials */}
            <div className="flex space-x-3">
              {[
                { icon: <FaYoutube />, label: "YouTube", color: "from-red-600 to-red-800" },
                { icon: <FaLinkedin />, label: "LinkedIn", color: "from-[#104c80] to-[#1e3a5f]" },
                { icon: <FaTwitter />, label: "Twitter", color: "from-sky-500 to-[#104c80]" },
                { icon: <FaFacebookF />, label: "Facebook", color: "from-[#104c80] to-[#1e3a5f]" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 border border-[#104c80] rounded-lg bg-[#0f2747] flex items-center justify-center text-white transition-all duration-300 hover:bg-gradient-to-r ${item.color} hover:scale-110 hover:shadow-lg`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-[#104c80] inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-200 hover:text-white transition-all duration-300 group"
                  >
                    <FaArrowRight className="mr-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-[#104c80] inline-block pb-1">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contacts.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 group">
                  <span className="text-lg mt-1 p-2 bg-[#0f2747] rounded-lg border border-[#104c80] group-hover:bg-gradient-to-r group-hover:from-[#104c80] group-hover:to-[#1e3a5f] transition-all">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm text-gray-300">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-white hover:text-[#cfe7ff] transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b-2 border-[#104c80] inline-block pb-1">
              Stay Updated
            </h3>
            <p className="text-gray-200 mb-4">
              Subscribe to our newsletter for the latest updates and
              announcements.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#0f2747] border border-[#104c80] rounded-lg py-3 px-4 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#104c80] to-[#1e3a5f] hover:from-[#1e3a5f] hover:to-black text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <span>Subscribe</span>
                <FaArrowRight className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#104c80] flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Al Tamakon. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Orb */}
      <div className="orb absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#104c80]/20 via-white/10 to-black/10 filter blur-3xl pointer-events-none transition-transform duration-100 ease-out"></div>
    </footer>
  );
}
