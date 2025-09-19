import React, { useState } from "react";
import { motion } from "framer-motion";
import ComplaintStatus from "./ComplaintStatus";
import UserInfoSection from "./UserInfoSection";
import ComplaintDetailsSection from "./ComplaintDetailsSection";
import ReferenceSection from "./ReferenceSection";
import ContactMethodSection from "./ContactMethodSection";
import ConsentSection from "./ConsentSection";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    studentId: "",
    grade: "",
    complaintType: "",
    description: "",
    involvedParties: "",
    witnesses: "",
    documents: null,
    contactMethod: "",
    contactTime: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const generateComplaintId = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("⚠️ Please agree to the consent statement before submitting.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newId = generateComplaintId();
      console.log("📩 Complaint submitted:", { ...formData, complaintId: newId });
      setComplaintId(newId);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="bg-gradient-to-l from-[#2a588a] via-[#1A426D] to-[#2a588a] px-6 py-5"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold text-white">
            Complaints & Feedback Portal
          </h1>
          <p className="text-indigo-100 mt-1 text-sm">
            Simple portal for Parents • Students • Staff
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="px-6 py-8 space-y-8"
            noValidate
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <UserInfoSection formData={formData} handleChange={handleChange} />
            <ComplaintDetailsSection
              formData={formData}
              handleChange={handleChange}
            />
            <ReferenceSection formData={formData} handleChange={handleChange} />
            <ContactMethodSection
              formData={formData}
              handleChange={handleChange}
            />
            <ConsentSection formData={formData} handleChange={handleChange} />

            {/* Actions */}
            <motion.div
              className="pt-6 flex justify-end border-t border-gray-200"
              variants={itemVariants}
            >
              <button
                type="button"
                className="mr-4 px-5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-sm font-semibold rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting
                    ? "bg-[#1A426E] cursor-not-allowed"
                    : "bg-[#1A426E] hover:bg-[#315d8d]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            className="px-6 py-12 text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            <motion.h2
              className="text-2xl font-semibold text-green-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              ✅ Complaint Submitted Successfully
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your complaint has been received. Please note your Complaint ID:
            </motion.p>
            <motion.p
              className="text-xl font-bold text-indigo-700"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {complaintId}
            </motion.p>

            {/* Status Tracking */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Track Your Complaint Status
              </h3>
              <ComplaintStatus initialId={complaintId} />
            </motion.div>

            <motion.button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: "",
                  role: "",
                  studentId: "",
                  grade: "",
                  complaintType: "",
                  description: "",
                  involvedParties: "",
                  witnesses: "",
                  documents: null,
                  contactMethod: "",
                  contactTime: "",
                  consent: false,
                });
                setComplaintId(null);
              }}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Submit Another Complaint
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ComplaintForm;
