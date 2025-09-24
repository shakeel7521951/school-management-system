import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const VocationalAndPhysicalDepartment = () => {
  return (
    <div className="w-full text-gray-800">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/80 to-[#0a3255]/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl md:w-[850px] font-bold mb-4 drop-shadow-2xl">
            Vocational and Physical Rehabilitation Department
          </h1>
          <p className="text-base sm:text-lg md:text-lg font-medium text-gray-100 max-w-3xl mx-auto">
            مدرسة التمكن الشاملة / Vocational and Physical Rehabilitation Department
          </p>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] mb-6">
          Welcome to Our Department
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
          At the Comprehensive Empowerment School, our Vocational and Physical
          Rehabilitation Department is dedicated to improving the quality of life
          for children, adults, and the elderly through specialized occupational
          and physical therapy programs.
        </p>
      </section>

      {/* What is Occupational Therapy */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#104c80] mb-4">
            What do we mean by Occupational Therapy?
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Occupational therapy is a healthcare profession that focuses on
            enhancing an individual’s health and well-being. It enables people
            of all ages to participate in meaningful activities by modifying the
            environment and creating strategies that support independence,
            functional performance, and social belonging.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Children with developmental delays affecting motor, cognitive, and sensory skills",
            "Children with specific difficulties like ADHD or sensory processing disorders",
            "Adults with impairments due to accidents, medical interventions, or chronic illness",
            "Elderly individuals with compromised functional abilities",
            "Children and adults with mental disabilities affecting daily performance",
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-left"
            >
              <h3 className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
                {item}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Goals */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#104c80] mb-6">
            Occupational Therapy Goals
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 text-left max-w-3xl mx-auto">
            {[
              "Help patients acquire the skills they lack using tailored strategies.",
              "Adapt environments to patient needs for greater independence.",
              "Guide parents and families in supporting functional development.",
              "Improve functional abilities, boost self-confidence, and promote independence.",
            ].map((goal, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
                {goal}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Physical Therapy Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#104c80] mb-6">
            Physical Therapy
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Pediatric physical therapy is a specialized field that focuses on
            providing care and treatment for children of all ages, from newborns
            to adolescents. It supports children facing challenges related to
            movement, motor development, muscular, skeletal, or neurological
            conditions.
          </p>

          <ul className="space-y-4 text-gray-700 text-left max-w-3xl mx-auto">
            {[
              "Assessment of the condition",
              "Developing a treatment plan",
              "Hands-on treatment techniques",
              "Education and family guidance",
              "Enhancing overall quality of life",
            ].map((point, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex items-start gap-3"
              >
                <FaCheckCircle className="text-[#104c80] text-xl mt-1" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Closing Section */}
      <section className="bg-gradient-to-r from-[#104c80] to-[#1e3a5f] py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6 text-white drop-shadow-lg"
          >
            Our Commitment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-100"
          >
            We are committed to empowering individuals of all ages with the
            skills and confidence they need to thrive in daily life. Through
            occupational and physical therapy, we strive to build independence,
            restore ability, and promote lifelong well-being.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default VocationalAndPhysicalDepartment;
