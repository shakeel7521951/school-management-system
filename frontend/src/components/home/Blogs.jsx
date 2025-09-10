import React from 'react'
import { FaCalendar, FaCommentDots, FaArrowRight } from 'react-icons/fa'

export default function Blogs() {
    const blog = [
        {
            img: 'https://img.freepik.com/premium-photo/teacher-working-with-small-group-kids_259150-5455.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80',
            calender: <FaCalendar />,
            date: "April 2024",
            comnt: <FaCommentDots />,
            comments: "5 Comments",
            title: 'Streamlining Administrative Tasks in Schools',
            description: 'Learn how modern school management systems can automate daily administrative tasks, saving time and reducing errors for educators and staff.',
            btn: 'Read more'
        },
        {
            img: 'https://img.freepik.com/free-photo/origami-lesson-home_23-2148542874.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80',
            calender: <FaCalendar />,
            date: "March 2024",
            comnt: <FaCommentDots />,
            comments: "12 Comments",
            title: 'Parent-Teacher Communication Platforms',
            description: 'Discover how digital platforms are revolutionizing communication between parents and teachers, leading to better student outcomes.',
            btn: 'Read more'
        },
        {
            img: 'https://img.freepik.com/free-photo/workers-looking-monthly-statistics_329181-12025.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80',
            calender: <FaCalendar />,
            date: "February 2024",
            comnt: <FaCommentDots />,
            comments: "8 Comments",
            title: 'Data-Driven Decision Making in Education',
            description: 'Explore how analytics and reporting features in school management systems help administrators make informed decisions about curriculum and resources.',
            btn: 'Read more'
        },
    ];

    return (
        <div className='py-16 bg-gray-50'>
            <div className='flex flex-wrap justify-between mx-auto sm:w-11/12 max-w-6xl'>
                {/* Left Content Section */}
                <div className='w-full order-2 rounded-md lg:w-6/12 p-6' style={{backgroundImage:'url(https://img.freepik.com/premium-vector/dark-blue-abstract-geometric-background-vector-illustration_1259894-793.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80)'}}>
                    <div className="mb-8">
                        <div className="w-16 h-1 bg-gradient-to-r from-white to-white mb-4 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Latest News & Updates
                        </h2>
                    </div>
                    <p className='text-white mb-8 text-lg leading-relaxed font-light'>
                        Stay informed with the latest developments, events, and announcements from our educational community.
                        From academic insights to policy updates and student achievements, our updates keep you connected
                        with what matters most in education.
                    </p>

                    <div className='w-full  rounded-lg overflow-hidden shadow-md border border-gray-100'>
                        <img
                            src="https://img.freepik.com/free-photo/happy-man-looking-laptop_23-2148406333.jpg?ga=GA1.1.1146211304.1754028702&semt=ais_hybrid&w=740&q=80"
                            className='w-full  object-cover'
                            alt="Professional educator reviewing content"
                        />
                    </div>

                    {/* Additional formal element */}
                    <div className='bg-white rounded-xl mt-3 p-4 w-full shadow-lg border border-gray-100' >
                        <div className="flex items-center mb-4">
                            <div className="bg-[#273C66] p-2 rounded-full mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Never Miss an Update</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Subscribe to our newsletter and be the first to know about new features,
                            events, and educational insights.
                        </p>
                        <div className="flex  flex-wrap">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg outline-0 "
                            />
                            <button className="bg-[#273C66] text-white px-2 sm:px-5 py-3 rounded-r-lg font-medium hover:bg-transparent hover:text-black hover:border-[#273C66] border transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Blog Posts Section */}
                <div className='w-full lg:w-6/12 p-4 order-1'>
                    <div className="space-y-6">
                        {blog.map((val, ind) => (
                            <div key={ind} className="bg-white p-5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-2/5 mb-4 sm:mb-0 sm:mr-5">
                                        <div className="rounded-md overflow-hidden">
                                            <img
                                                src={val.img}
                                                alt={val.title}
                                                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:w-3/5">
                                        <div className="flex items-center text-xs text-gray-500 mb-3 font-medium">
                                            <div className="flex items-center mr-4">
                                                <span className="text-[#1A4480] mr-1">{val.calender}</span>
                                                <span className="text-gray-600">{val.date}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-[#1A4480] mr-1">{val.comnt}</span>
                                                <span className="text-gray-600">{val.comments}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight hover:text-[#1A4480] transition-colors cursor-pointer">
                                            {val.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                            {val.description}
                                        </p>

                                        <button className="flex items-center bg-[#1A4480] py-2 px-4 text-white rounded-md cursor-pointer font-medium text-sm hover:bg-[#1a4480ce] transition-colors group">
                                            {val.btn}
                                            <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}