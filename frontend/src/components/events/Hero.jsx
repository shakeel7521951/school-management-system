import React, { useEffect } from 'react';
import { FaCalendarAlt, FaSchool, FaUsers, FaGraduationCap } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden pt-5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-opacity-20 bg-pattern"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <span className="text-white">School</span> Calendar & Activities
            </h1>
            
            <p 
              className="text-lg sm:text-xl mb-8 text-blue-100 max-w-xl mx-auto lg:mx-0"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Explore upcoming academic events, parent meetings, and student activities — all in one place for our community.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <button className="bg-white hover:bg-blue-50 text-indigo-600 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                View Full Calendar
              </button>
              <button className="border-2 border-blue-300 text-blue-100 hover:bg-indigo-500/80 hover:text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                Explore Events
              </button>
            </div>
          </div>
          
          {/* Right Content - Feature Icons */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <FaCalendarAlt size={40} />, text: "Academic Calendar", delay: 200 },
              { icon: <FaSchool size={40} />, text: "Student Activities", delay: 400 },
              { icon: <FaUsers size={40} />, text: "Parent Engagements", delay: 600 },
              { icon: <FaGraduationCap size={40} />, text: "Graduation Ceremonies", delay: 800 }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-indigo-700/30 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center shadow-lg transform transition duration-500 hover:scale-105 border border-indigo-300/30"
                data-aos="zoom-in"
                data-aos-delay={item.delay}
              >
                <div className="text-white mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-white">{item.text}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 pb-4 border-t border-blue-300/30"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          {[
            { number: "50+", text: "Annual Programs" },
            { number: "1000+", text: "Active Students" },
            { number: "200+", text: "Dedicated Staff" },
            { number: "15+", text: "Years of Excellence" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.number}</p>
              <p className="text-blue-100">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>
      
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default Hero;
