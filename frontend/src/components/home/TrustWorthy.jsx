import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

export default function TrustWorthy() {
    const aray = [
        {
            title: 'Visitor Management', description: "Seamlessly register and track visitors with a digital gate system connected to CRM. Keep your campus secure and organized."
        },
        {
            title: 'Complaints & Feedback', description: "A transparent portal for parents, students, and staff. Track complaints, monitor resolution time, and ensure satisfaction."
        },
        {
            title: 'Document Workflow', description: "Go paperless with digital approvals, e-signatures, and smart archiving. Save time and ensure accountability."
        },
        {
            title: 'Analytics & Reports', description: "Daily, weekly, and monthly reports with insights on performance, decision times, and complaint resolutions. Export to Excel/PDF easily."
        },
    ]
    return (
        <div className=' py-10'>
            <div className=' flex p-3 flex-wrap justify-between w-full sm:w-10/12 mx-auto'>
                <div className='w-full sm:w-6/12 p-3'>
                    <h1 className=' font-bold sm:text-3xl text-xl'>Smart School <span style={{ background: 'linear-gradient(#273C66,#6dd5ed)', backgroundClip: 'text', color: 'transparent' }}>Digital Management</span></h1>
                    <p className=' mt-2'>Simplify operations, enhance communication, and create a modern learning experience with our all-in-one school management solution.</p>
                    <div className="flex flex-col gap-4 mt-2 ">
                        {aray.map((val, ind) => (
                            <div
                                key={ind}
                                className="relative border border-blue-400/40 shadow shadow-blue-600/50 py-5 px-4 rounded-xl transition-all ease-in delay-75 hover:shadow-xl hover:border-blue-700 cursor-pointer text-white bg-gradient-to-r from-[#1A4480] to-[#1A4480] hover:scale-105"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Icon instead of number */}
                                    <FaCheckCircle className="text-white text-xl mt-1 flex-shrink-0" />

                                    <div>
                                        <h1 className="font-semibold text-lg">{val.title}</h1>
                                        <p className="px-1 text-sm text-justify">{val.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full   relative flex justify-center items-center sm:w-5/12 mt-8 sm:mt-0">
                    <div className="relative group w-full max-w-md">
                        {/* Main image with modern frame */}
                        <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <img
                                src="https://img.freepik.com/premium-vector/people-are-reading-books-sitting-laptop-online-education-concept-landing-page-template_212216-951.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80"
                                alt="Online education platform"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#78d3fd8f] to-transparent"></div>
                        </div>

                        {/* Floating elements around the main image */}
                        <div className="absolute hidden sm:flex -top-5 -right-5 bg-white p-3 rounded-lg shadow-lg z-20">
                            <div className="flex items-center">
                                <div className="bg-[#1A4480] p-2 transition-all ease-in delay-75 group-hover:bg-[#273C66] rounded-full mr-2">
                                    <svg className="w-5 h-5 transition-all ease-in delay-75 text-white group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">2,500+ eBooks</span>
                            </div>
                        </div>

                        <div className="absolute hidden sm:flex -bottom-5 -left-5 bg-white p-3 rounded-lg shadow-lg z-20">
                            <div className="flex items-center">
                                <div className="bg-[#1A4480] p-2 transition-all ease-in delay-75 group-hover:bg-[#273C66] rounded-full mr-2">
                                    <svg className="w-5 h-5 transition-all ease-in delay-75 text-white group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">Track Progress</span>
                            </div>
                        </div>

                        {/* Background decorative elements */}
                        <div className="absolute hidden sm:flex -top-10 -right-10 w-20 h-20 rounded-full bg-blue-400/10 z-0"></div>
                        <div className="absolute hidden sm:flex -bottom-10 -left-10 w-24 h-24 rounded-full bg-yellow-400/10 z-0"></div>
                        <div className="absolute hidden sm:flex top-1/2 -right-12 w-16 h-16 rounded-full bg-green-400/10 z-0"></div>

                        {/* Animated pulse element */}
                        <div className="absolute hidden sm:flex top-0 left-0 w-full h-full rounded-xl border-4 border-blue-400/30 animate-ping-slow z-0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
