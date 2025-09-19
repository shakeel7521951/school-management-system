import React from 'react';
import { Link } from 'react-router-dom';

const HeaderSection = () => {
  return (
    <div className="relative mt-10 bg-gradient-to-r from-[#273C66] to-[#1A4480] py-16 overflow-hidden">
  
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg className="absolute top-10 left-1/4 w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <svg className="absolute bottom-20 right-1/3 w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 20V10m-6 10V4M6 20v-6" />
        </svg>
        <svg className="absolute bottom-1/4 left-1/3 w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center relative z-10">
        <div className="w-full lg:w-6/12 px-4 mb-10 lg:mb-0">
          <h1 className="text-[#ffffff4e] text-sm font-semibold tracking-wider uppercase mb-2">
            School Document Workflow System
          </h1>
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            Structured, Secure, and Bilingual Document Approvals
          </h1>
          <p className="text-lg text-[#ffffff4e] mb-8 leading-relaxed">
            The School Document Workflow System ensures a clear and reliable approval 
            process across departments. Users can upload documents, the Planning Department 
            reviews them, and the General Manager provides the final approval — all with full 
            Arabic and English support.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="text-black transition-all ease-in cursor-pointer px-6 py-3 bg-white hover:bg-[#273C66] shadow-white hover:text-white rounded-full shadow-md hover:shadow-md items-center">
              Get Free Demo
            </button>
            <Link to="/contact-us" className="text-white px-6 py-3 border border-white hover:border hover:bg-transparent shadow-white hover:text-white transition-all ease-in cursor-pointer rounded-full shadow hover:shadow-md flex items-center">
              Contact Us
            </Link>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="flex group items-center">
              <div className="bg-white p-2 transition-all ease-in delay-75 group-hover:shadow shadow-white group-hover:bg-[#1A4480] rounded-full mr-2">
                <svg className="w-5 h-5 transition-all ease-in delay-75 text-black group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-white text-sm">User Document Upload</span>
            </div>
            <div className="flex group items-center">
              <div className="bg-white p-2 transition-all ease-in delay-75 group-hover:shadow shadow-white group-hover:bg-[#1A4480] rounded-full mr-2">
                <svg className="w-5 h-5 transition-all ease-in delay-75 text-black group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white text-sm">Planning Department Review</span>
            </div>
            <div className="flex group items-center">
              <div className="bg-white p-2 transition-all ease-in delay-75 group-hover:shadow shadow-white group-hover:bg-[#1A4480] rounded-full mr-2">
                <svg className="w-5 h-5 transition-all ease-in delay-75 text-black group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-white text-sm">General Manager Approval</span>
            </div>
            <div className="flex group items-center">
              <div className="bg-white p-2 transition-all ease-in delay-75 group-hover:shadow shadow-white group-hover:bg-[#1A4480] rounded-full mr-2">
                <svg className="w-5 h-5 transition-all ease-in delay-75 text-black group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-white text-sm">Bilingual Interface</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-5/12 relative">
          <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 group">
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/woman-teaching-her-kid-drawing-illustration-svg-png-download-7000906.png" 
              alt="School workflow illustration" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            
            {/* Floating stats card */}
            <div className="absolute bottom-8 left-30 sm:bottom-13 sm:left-10 transition-all ease-in-out delay-75 group-hover:left-93 bg-white rounded-full p-1 shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full ">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <svg className="absolute text-white/20 w-40 h-40 -bottom-12 -left-12 -z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-yellow-400/10 -z-10"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-green-400/10 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
