import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is a School Management System?",
        answer:
            "A School Management System automates school operations like student data, attendance, exams, timetable, fee collection, and communication between parents, teachers, and administrators.",
    },
    {
        question: "How does it help parents?",
        answer:
            "Parents can monitor their child’s academic progress, fee status, attendance, and even communicate directly with teachers via a dedicated portal or mobile app.",
    },
    {
        question: "Is online learning supported?",
        answer:
            "Yes, teachers can schedule online classes, share resources, manage assignments, and conduct quizzes within the system for seamless digital learning.",
    },
    {
        question: "How secure is the platform?",
        answer:
            "The system uses encrypted authentication, role-based access, and cloud security protocols to ensure all student and school data stays safe.",
    },
    {
        question: "Can it be accessed on mobile?",
        answer:
            "Yes, it’s fully responsive and supports both Android and iOS apps for easy access by students, parents, and teachers anytime, anywhere.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-20 bg-gradient-to-r from-[#1A4480] to-[#273C66] text-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
                {/* Left Section */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-snug">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-200 leading-relaxed">
                        Get answers to the most common questions about our{" "}
                        <span className="font-semibold">School Management System</span>.
                        Designed to make life easier for administrators, teachers, parents, and students.
                    </p>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl shadow-md inline-flex items-center space-x-3">
                        <HelpCircle className="w-6 h-6 text-yellow-300" />
                        <span className="text-gray-200">
                            Didn’t find your question?{" "}
                            <a
                                href="#contact"
                                className="text-yellow-300 hover:underline font-medium"
                            >
                                Contact Support
                            </a>
                        </span>

                    </div>
                    <div className=" w-full h-70 sm:w-[74%] flex justify-center">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/customer-support-illustration-svg-download-png-4644760.png" className=" shadow-[#36619d] shadow-md w-[80%] h-[100%]" alt="missing" />
                    </div>

                </div>

                {/* Right Section (FAQ Accordion) */}
                <div className="space-y-5">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full px-6 py-5 text-left text-lg font-semibold focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? "rotate-180 text-yellow-300" : ""
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`px-6 pb-5 text-base text-gray-200 leading-relaxed transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
