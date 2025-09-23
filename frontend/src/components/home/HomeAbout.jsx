import React from "react";
import { Link } from "react-router-dom";

export default function HomeAbout() {
    return (
        <div className="py-16 bg-gradient-to-br from-[#2d6dc65c] to-[#eff3fa79] relative">
            <div className="container sm:w-11/12 mx-auto px-4 flex flex-wrap lg:flex-nowrap items-center gap-12">

                {/* Content Section (Left) */}
                <section className="lg:w-6/12">
                    <div className="px-6 text-left">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A4480] mb-6">
                            Why Tamakon School?
                        </h2>
                        <p className="text-lg text-gray-600 font-semibold text-justify leading-relaxed mb-8">
                            The Comprehensive Tamakon School was established in 2008 to meet
                            the growing societal need for comprehensive services for students
                            with multiple intelligences and capabilities. It was licensed as
                            the first specialized private school for students with these
                            abilities in Qatar, offering educational and therapeutic
                            rehabilitation services for males and females across all academic
                            levels.
                        </p>
                        <Link to="/contact-us" className="px-4 py-3 text-[18px] font-semibold bg-gradient-to-r from-[#273C66] to-[#1A4480] text-white rounded-full shadow-md hover:scale-105 transition">
                            Contact Us Now
                        </Link>
                    </div>
                </section>

                {/* Image Section (Right) */}
                <div className="w-full lg:w-5/12 relative">
                    <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                        <img
                            src="./images/child.jpg"
                            className="w-full h-auto rounded-xl"
                            alt="Digital School System"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-blue-400/10 z-0"></div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-400/10 z-0"></div>
                </div>
            </div>
        </div>
    );
}
