import React, { useState } from "react";

export default function StudyResearch() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const data = [
        { title: "Education Excellence", percentage: 90 },
        { title: "Student Motivation", percentage: 80 },
        { title: "Personal Coaching", percentage: 85 },
    ];

    const openVideo = () => setIsVideoOpen(true);
    const closeVideo = () => setIsVideoOpen(false);

    return (
        <div className="py-16 bg-gradient-to-br from-[#2d6dc65c] to-[#eff3fa79] relative">
            <div className="container sm:w-11/12 mx-auto px-4 flex flex-wrap justify-between items-center">
                {/* Image Section */}
                <div className="w-full lg:w-5/12 mb-10 lg:mb-0 relative">
                    <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                        <img
                            src="https://img.freepik.com/premium-photo/mature-students-working-together-college-library_107420-68433.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80"
                            className="w-full h-auto"
                            alt="Students collaborating in library"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                        
                        {/* Play Button Overlay */}
                        <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                            onClick={openVideo}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-700/90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                                <svg 
                                    className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-400/10 z-0"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-400/10 z-0"></div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-6/12 px-4">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mr-4 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Academic Excellence & Research
                        </h2>
                    </div>
                    
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Driving innovation through remarkable research and exceptional
                        teaching expertise. Our programs combine academic excellence with
                        real-world applications, empowering students to achieve their full
                        potential.
                    </p>

                    {/* Progress Bars */}
                    <div className="space-y-6 mb-8">
                        {data.map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between mb-2">
                                    <span className="text-md font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                                        {item.title}
                                    </span>
                                    <span className="text-md font-semibold text-blue-700">
                                        {item.percentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full relative overflow-hidden"
                                        style={{
                                            width: `${item.percentage}%`,
                                            background: "linear-gradient(90deg, #1A4480 0%, #273C66 100%)",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-6 py-3 rounded-md bg-gradient-to-r cursor-pointer from-[#1A4480] to-[#273c66ac] text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
                            <span>Discover Our Programs</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button className="px-6 py-3 rounded-md border border-[#1A4480] cursor-pointer text-[#1A4480] font-semibold shadow-sm hover:bg-blue-50 transition-colors duration-300">
                            Research Publications
                        </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap mt-10 pt-8 border-t border-gray-200">
                        <div className="w-1/2 md:w-1/3 mb-4 md:mb-0">
                            <div className="text-2xl font-bold text-[#1A4480]">95%</div>
                            <div className="text-sm text-gray-600">Academic Success</div>
                        </div>
                        <div className="w-1/2 md:w-1/3 mb-4 md:mb-0">
                            <div className="text-2xl font-bold text-[#1A4480]">500+</div>
                            <div className="text-sm text-gray-600">Happy Students</div>
                        </div>
                        <div className="w-1/2 md:w-1/3">
                            <div className="text-2xl font-bold text-[#1A4480]">98%</div>
                            <div className="text-sm text-gray-600">Parent Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                    <div className="relative w-full max-w-4xl">
                        <button 
                            onClick={closeVideo}
                            className="absolute -top-12 right-0 text-white text-3xl hover:text-blue-400 transition-colors z-10"
                            aria-label="Close video"
                        >
                            &times;
                        </button>
                        
                        <div className="relative pt-[56.25%]"> 
                            <video
                                className="absolute inset-0 w-full h-full rounded-lg"
                                src="https://tamakon.edu.qa/wp-content/uploads/2024/11/video.mp4"
                                title="Academic Excellence Video"
                                controls
                            ></video>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}