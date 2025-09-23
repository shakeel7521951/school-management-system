import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What kind of learning is provided at Tamakon School for Learning Disabilities?",
      a: "At Tamakon School, we offer customized educational programs targeting students facing learning difficulties. Our aim is to provide personalized support for each student to help them develop their skills and succeed in learning.",
    },
    {
      q: "Who are the teachers at Tamakon School?",
      a: "Our teachers are specialists in the field of learning disabilities and have experience in delivering education to students facing challenges in this regard. They work closely with the students to identify their needs and provide appropriate support.",
    },
    {
      q: "Are customized educational programs offered?",
      a: "Yes, we do provide customized educational programs based on the needs of each student. Lessons and activities are tailored to the student’s level and individual requirements.",
    },
    {
      q: "Do you offer support to parents?",
      a: "Yes, we also offer support to parents. Our goal is to enhance collaboration between the school and parents to ensure optimal support for the students. Parents can contact us for consultations or participate in workshops and meetings.",
    },
    {
      q: "How can I apply for my child’s admission to Tamakon School?",
      a: "You can contact the school to learn about the registration procedures and requirements. These procedures may vary from one school to another.",
    },
    {
      q: "What additional activities do you provide?",
      a: "We offer a variety of additional activities, including private lessons, workshops, and social events. Our goal is to provide enjoyable and beneficial educational experiences for the students.",
    },
    {
      q: "What is your vision and mission as a comprehensive Tamakon school?",
      a: "We aim to provide a comprehensive and sustainable educational environment that meets the needs of all students with professionalism and special care for individuals with special needs.",
    },
    {
      q: "What educational services and support are available for students with learning difficulties?",
      a: "We offer customized educational programs and individual support, including support teachers and social and emotional guidance to ensure academic and personal success for each student.",
    },
    {
      q: "What methods are followed to assess students’ needs and progress?",
      a: "We use multiple assessment techniques to understand the students’ needs and progress, including academic assessment and personal development assessments.",
    },
    {
      q: "Do you provide special services for students with special needs such as occupational therapy or speech therapy?",
      a: "Yes, we collaborate with specialists in the fields of occupational therapy and speech therapy to provide the necessary services for the students.",
    },
    {
      q: "What steps are required for enrollment in your school?",
      a: "Parents should apply through the electronic form available on our website, and then they will be contacted to complete the necessary procedures.",
    },
    {
      q: "Do you have special facilities to ensure accessibility and accommodations for students with special needs?",
      a: "Yes, we are committed to providing an adapted educational environment to ensure accessibility for all students.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-2xl md:text-6xl font-extrabold mb-4 drop-shadow-xl tracking-wide">
            FAQ
          </h1>
          <p className="text-lg md:text-2xl font-medium text-gray-100 drop-shadow">
            مدرسة التمكن الشاملة / FAQ
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-[#104c80] mb-8 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left font-semibold text-gray-800 text-lg"
              >
                {faq.q}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-gray-600 leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
