import { useRef, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "General Inquiry",
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
        setFormData({ user_name: "", user_email: "", subject: "General Inquiry", message: "" }); // Reset form
      })
      .catch((error) => toast.error("Failed to send: " + error.text));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-50">
      {/* Hero Section */}
      <div
        className="text-center relative py-20 sm:py-32 md:py-40 text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://allonehealth.com/wp-content/uploads/2022/07/iStock-1358014313-scaled-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#114E83]/80 via-[#114E83]/60 to-[#114E83]/80"></div>
        <div className="relative z-10 px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-7xl pt-14 font-extrabold text-white mb-4 sm:mb-6"
            data-aos="fade-down"
          >
            Get In Touch
          </h1>
          <p
            className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto text-white font-semibold"
            data-aos="fade-up"
          >
            Have a question, complaint, feedback, or suggestion? Our Al_Tamakon's
            team is ready to assist you.
          </p>
        </div>
      </div>

      {/* Secondary Heading */}
      <div className="text-center my-12 px-4">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-[#1A4480]"
          data-aos="fade-down"
        >
          Contact Us
        </h2>
        <p
          className="text-gray-700 mt-2 text-base md:text-lg"
          data-aos="fade-up"
        >
          Fill out the form below or use the contact information to reach us.
        </p>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Contact Info */}
          <div
            className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300"
            data-aos="fade-right"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#1A4480] mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-base md:text-lg">
                <FaMapMarkerAlt className="mr-2 text-[#d08700]" />Ain Khaled, Umm Saneem, Al-Sammak Street 392, Area 56, Building 41
              </p>
              <p className="flex items-center text-base md:text-lg">
                <FaPhone className="mr-2 text-[#d08700]" /> +97444660466
              </p>
              <p className="flex items-center text-base md:text-lg">
                <FaEnvelope className="mr-2 text-[#d08700]" /> info@tamakon.org
              </p>
            </div>
          </div>

          {/* Why Contact Us */}
          <div
            className="bg-white shadow-xl rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            data-aos="fade-right"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#1A4480] mb-2">
              Why Contact Us?
            </h3>
            <p className="text-gray-700 text-sm md:text-base">
              We welcome messages from parents, students, and staff for
              inquiries, complaints, or feedback. Our team in Qatar is dedicated
              to providing quick and helpful responses.
            </p>
            <p className="text-gray-700 text-sm md:text-base mt-2">
              Please provide as much detail as possible in your message so we
              can assist you efficiently.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-2 px-2">
            <a
              href="#"
              className="text-white bg-[#1A4480] rounded-full p-2 text-2xl border-[#d08700] hover:scale-110 transition-all duration-300 border-2 hover:bg-white hover:text-[#d08700]"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-white bg-[#1A4480] rounded-full p-2 text-2xl border-[#d08700] hover:scale-110 transition-all duration-300 border-2 hover:bg-white hover:text-[#d08700]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-white bg-[#1A4480] rounded-full p-2 text-2xl border-[#d08700] hover:scale-110 transition-all duration-300 border-2 hover:bg-white hover:text-[#d08700]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <div
          className="flex-1 bg-white shadow-xl rounded-2xl p-6 sm:p-10"
          data-aos="flip-left"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#1A4480] mb-4">
            Send a Message
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-6">
            Use this form to submit a general inquiry, complaint, feedback, or
            suggestion. We will respond promptly.
          </p>
          <form ref={form} className="space-y-4 md:space-y-6" onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                  className="w-full mt-1 px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
                  className="w-full mt-1 px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-800 text-sm md:text-base">
                Type of Message
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-1 px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option>General Inquiry</option>
                <option>Complaint</option>
                <option>Feedback</option>
                <option>Suggestion</option>
              </select>
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
                rows="5"
                className="w-full mt-1 px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1a4480] to-[#153567] text-[#facc15] py-2.5 md:py-3 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 hover:scale-105 transition-all"
            >
              Submit Message
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
