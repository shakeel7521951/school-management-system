import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ReviewSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "School Principal",
            avatar: "https://img.freepik.com/free-photo/portrait-confident-educated-asian-female-teacher_53876-129491.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
            rating: 5,
            content: "This platform has transformed how we manage our school. Attendance tracking, grade management, and parent communication have never been smoother. Our teachers are more efficient and parents feel more connected.",
            school: "Greenwood High School"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Parent",
            avatar: "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man_158595-5130.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
            rating: 5,
            content: "As a parent, I love being able to track my child's progress in real-time. The notification system keeps me updated on assignments, events, and important announcements. It's like having a window into the classroom.",
            school: "Parent of two students"
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            role: "Mathematics Department Head",
            avatar: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
            rating: 5,
            content: "The analytics features have revolutionized how we assess student performance. We can now identify learning gaps early and tailor our instruction accordingly. Our test scores have improved by 22% since implementation.",
            school: "Lincoln Academy"
        },
        {
            id: 4,
            name: "James Wilson",
            role: "IT Administrator",
            avatar: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
            rating: 5,
            content: "Implementation was seamless, and the support team was exceptional. The system integrates perfectly with our existing infrastructure. I particularly appreciate the robust security features protecting student data.",
            school: "Central School District"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            role: "Art Teacher",
            avatar: "https://img.freepik.com/free-photo/portrait-young-beautiful-teacher_1303-18063.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80",
            rating: 5,
            content: "Even as someone who isn't tech-savvy, I found the platform incredibly intuitive. Submitting grades, taking attendance, and sharing resources with students has never been easier. It's truly teacher-friendly!",
            school: "Creative Arts Magnet School"
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
        
        // Always show 3 reviews: previous, current, and next
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + totalReviews) % totalReviews;
            visibleReviews.push({
                ...reviews[index],
                position: i // -1: left, 0: center, 1: right
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
                        Hear from educators, parents, and administrators who have transformed their 
                        educational experience with our school management platform.
                    </p>
                </div>

                {/* Review Slider */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="flex items-center justify-center h-96">
                        {getVisibleReviews().map((review, index) => (
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
                                    
                                    {/* Decorative element */}
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