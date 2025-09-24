import React from "react";

const ContactMap = () => {
  return (
    <div className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb]">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        data-aos="fade-up"
      >
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-pink-200 opacity-30"></div>

      

        {/* Map Container */}
        <iframe
          title="School Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.90220123325!2d51.5310!3d25.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5a80b5e2b4d%3A0x9b8c53ed77d05f0a!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1600000000000!5m2!1sen!2sqa"
          width="100%"
          height="450"
          className="relative z-10 rounded-2xl border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Footer Note */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md z-20 max-w-xs">
          <p className="text-sm md:text-base text-gray-700">
            Use the map to easily locate and navigate to our school in Doha.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
