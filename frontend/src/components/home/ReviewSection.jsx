import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ReviewSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const reviews = [
        {
            id: 1,
            name: "Aisha Al-Mutairi",
            role: "School Principal",
            avatar: "https://img.freepik.com/free-photo/portrait-confident-educated-asian-female-teacher_53876-129491.jpg?w=740&q=80",
            rating: 5,
            content: "The document workflow system has made our approval process more transparent. Every document now passes smoothly from the Planning Department to the General Manager’s Office without delays.",
            school: "Al Noor International School"
        },
        {
            id: 2,
            name: "Fahad Al-Saadi",
            role: "Planning Department Staff",
            avatar: "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man_158595-5130.jpg?w=740&q=80",
            rating: 5,
            content: "Our team can now review submissions efficiently and provide clear feedback. The structured workflow prevents documents from being lost or bypassed, saving us hours of manual tracking.",
            school: "Planning Department"
        },
        {
            id: 3,
            name: "Dr. Mariam Khalid",
            role: "General Manager",
            avatar: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?w=740&q=80",
            rating: 5,
            content: "With this system, I can review and approve documents in an organized way. It ensures that all approvals are documented, making the process more reliable and accountable.",
            school: "General Manager Office"
        },
        {
            id: 4,
            name: "Omar Hassan",
            role: "IT Administrator",
            avatar: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&q=80",
            rating: 5,
            content: "Integration was quick and smooth. The security features are excellent, ensuring all sensitive school data is protected. Teachers and staff found the system very easy to adapt to.",
            school: "Central Education Network"
        },
        {
            id: 5,
            name: "Lina Youssef",
            role: "Teacher",
            avatar: "https://img.freepik.com/free-photo/portrait-young-beautiful-teacher_1303-18063.jpg?w=740&q=80",
            rating: 5,
            content: "Submitting documents for approval is now hassle-free. I can upload, track status, and receive feedback without chasing signatures. It has reduced paperwork stress significantly.",
            school: "Creative Arts School"
        }
    ];

    const nextReview = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextReview();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Calculate which reviews to show based on current index
    const getVisibleReviews = () => {
        const visibleReviews = [];
        const totalReviews = reviews.length;
        
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + totalReviews) % totalReviews;
            visibleReviews.push({
                ...reviews[index],
                position: i 
            });
        }
        
        return visibleReviews;
    };

    return (
        <div className="py-10 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#273C66] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A4480] opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#273C66] mb-4">What Our Community Says</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Hear from principals, teachers, IT staff, and managers about how the School Document Workflow System improved transparency, efficiency, and accountability.
                    </p>
                </div>

                {/* Review Slider */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="flex items-center justify-center h-96">
                        {getVisibleReviews().map((review) => (
                            <div 
                                key={review.id}
                                className={`absolute transition-all duration-500 ease-in-out transform
                                    ${review.position === -1 ? 
                                        '-translate-x-80 opacity-60 scale-90 z-10' : 
                                    review.position === 0 ? 
                                        'translate-x-0 opacity-100 scale-100 z-20' : 
                                        'translate-x-80 opacity-60 scale-90 z-10'}`}
                                style={{
                                    perspective: '1000px'
                                }}
                            >
                                <div className={`bg-white rounded-xl shadow-2xl p-8 mx-4 w-96 transition-transform duration-500
                                    ${review.position === 0 ? 'hover:scale-105' : ''}`}
                                    style={{
                                        transform: review.position !== 0 ? 'rotateY(5deg)' : 'rotateY(0deg)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <div className="flex items-start mb-6">
                                        <div className="relative">
                                            <img 
                                                src={review.avatar} 
                                                alt={review.name}
                                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A4480] rounded-full flex items-center justify-center">
                                                <FaQuoteLeft className="text-white text-xs" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-[#273C66]">{review.name}</h4>
                                            <p className="text-sm text-gray-600">{review.role}</p>
                                            <p className="text-xs text-gray-500 italic">{review.school}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    
                                    <p className="text-gray-700 italic mb-6 leading-relaxed">
                                        "{review.content}"
                                    </p>
                                    
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#273C66] opacity-5 rounded-tl-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation arrows */}
                    <button 
                        onClick={prevReview}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-4 rounded-full shadow-lg hover:bg-[#273C66] hover:text-white transition-all duration-300 z-30"
                    >
                        <FaChevronLeft />
                    </button>
                    <button 
                        onClick={nextReview}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-4 rounded-full shadow-lg hover:bg-[#273C66] hover:text-white transition-all duration-300 z-30"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
