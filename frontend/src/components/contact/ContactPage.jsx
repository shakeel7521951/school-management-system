import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_0qabf0m", "template_ksnjrpa", form.current, {
        publicKey: "ZkkXKoa_K5Yh1CDJJ",
      })
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({
          user_name: "",
          user_email: "",
          user_phone: "",
          message: "",
        });
      })
      .catch((error) => toast.error("Failed to send: " + error.text));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Flip animation variant
  const flipVariant = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full blur-3xl opacity-40"></div>

      {/* Hero Section */}
      <section
        className="relative w-full h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl tracking-wide">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed">
            مدرسة التمكن الشاملة / Contact Us
          </p>
        </motion.div>
      </section>

      {/* Secondary Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center my-14 px-4 py-10  "
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#104c80]">
          Keep in Touch
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Do you have some suggestions or just want to say hello? <br />
          Our support team is ready to help you{" "}
          <span className="font-semibold text-[#104c80]">24/7</span>.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Address */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/address.png"
                alt="Location"
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              Address
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Ain Khaled, Umm Saneem, <br />
              Al-Sammak Street 392, <br />
              Area 56, Building 41
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/smartphone.png"
                alt="Phone"
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              Phone Number
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              +974 4466 0466
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] shadow-2xl rounded-3xl p-6 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#104c80]/10 mb-4">
              <img
                src="./images/open-email.png"
                alt="Email"
                className="w-10 h-10"
              />
            </div>
            <h4 className="text-lg font-semibold mb-3 text-[#104c80]">
              Email Address
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              info@tamakon.org
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#f9fafb] via-[#f1f5f9] to-[#f9fafb] shadow-2xl rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto mb-20"
      >
        <form ref={form} className="space-y-6" onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-800 text-sm md:text-base">
                Full Name *
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-800 text-sm md:text-base">
                Email *
              </label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-800 text-sm md:text-base">
              Phone
            </label>
            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-800 text-sm md:text-base">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              required
              rows="6"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#1a4480] to-[#153567] text-[#facc15] py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
          >
            Submit Message
          </motion.button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
      </motion.div>
    </div>
  );
};

export default ContactPage;
