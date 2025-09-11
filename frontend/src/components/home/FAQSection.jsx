import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is a School Management System?",
        answer:
            "It is an all-in-one digital platform that streamlines school operations such as student records, attendance, exams, timetable, fees, and communication between teachers, parents, and administrators.",
    },
    {
        question: "How does it benefit parents?",
        answer:
            "Parents get real-time updates about their child’s progress, attendance, homework, and fee payments. They can directly connect with teachers through the app or parent portal, ensuring transparency and engagement.",
    },
    {
        question: "Does it support online learning?",
        answer:
            "Yes. Teachers can schedule virtual classes, share study materials, assign homework, and even conduct assessments online. This creates a seamless hybrid learning environment.",
    },
    {
        question: "Is the platform secure?",
        answer:
            "Absolutely. The system uses encrypted login, role-based permissions, and cloud-grade security protocols to safeguard all school and student data against unauthorized access.",
    },
    {
        question: "Can it be used on mobile devices?",
        answer:
            "Yes. The platform is mobile-friendly and comes with dedicated Android and iOS apps, allowing parents, students, and teachers to stay connected anytime, anywhere.",
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
                        Find quick answers about our{" "}
                        <span className="font-semibold">School Management Platform</span>. 
                        Built to simplify operations for administrators, empower teachers, and keep 
                        parents fully informed.
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
                    <div className="w-full h-70 sm:w-[74%] flex justify-center">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/customer-support-illustration-svg-download-png-4644760.png"
                            className="shadow-[#36619d] shadow-md w-[80%] h-[100%]"
                            alt="support illustration"
                        />
                    </div>
                </div>

                {/* Right Section (Accordion) */}
                <div className="space-y-5">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full px-6 py-5 text-left text-lg font-semibold focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-6 h-6 transform transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180 text-yellow-300" : ""
                                    }`}
                                />
                            </button>

                            <div
                                className={`px-6 pb-5 text-base text-gray-200 leading-relaxed transition-all duration-500 ease-in-out ${
                                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
