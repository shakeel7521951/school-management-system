import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LuGraduationCap } from "react-icons/lu";

const ComplaintsSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("complaints");
    const [openDropdown, setOpenDropdown] = useState("complaints");
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setIsOpen(isDesktop);
    }, [isDesktop]);

    // ✅ Complaints Menu
    const complaintsItem = {
        id: "/student-complaint",
        label: "Complaints",
        icon: "MessageSquare",
        dropdown: [
            { id: "/student-complaint", label: "Students Complaints" },
            { id: "/teacher-complaint", label: "Teachers Complaints" },
        ],
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {!isDesktop && isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full 
          bg-gradient-to-b from-white/90 to-blue-50/90 
          backdrop-blur-lg border-r border-gray-200
          shadow-xl transition-all duration-500 z-50 flex flex-col
          ${isOpen ? "w-72" : "w-0 lg:w-72"} overflow-hidden`}
            >
                {/* Logo Section */}
                <div className="px-6 py-8 flex flex-col items-center border-b border-gray-200">
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 shadow-md animate-bounce">
                        <LuGraduationCap size={36} className="text-blue-700" />
                    </div>
                    {isOpen && (
                        <>
                            <h2 className="mt-3 text-3xl font-bold text-[#1a4480] tracking-wide">
                                Al-Tamakon
                            </h2>
                            <p className="text-[15px] text-gray-500">Department Panel</p>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-grow mt-6 space-y-2 px-3">
                    {/* Complaints Dropdown */}
                    <div>
                        <button
                            onClick={() =>
                                setOpenDropdown(
                                    openDropdown === complaintsItem.id ? null : complaintsItem.id
                                )
                            }
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                ${activeItem === complaintsItem.id
                                    ? "bg-blue-100 text-blue-700 shadow-inner"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icons.MessageSquare
                                size={20}
                                className={`${activeItem === complaintsItem.id ? "text-blue-700" : "text-blue-600"
                                    }`}
                            />
                            {isOpen && (
                                <>
                                    <span className="text-sm font-medium">{complaintsItem.label}</span>
                                    {openDropdown === complaintsItem.id ? (
                                        <Icons.ChevronDown size={16} className="ml-auto text-gray-500" />
                                    ) : (
                                        <Icons.ChevronRight size={16} className="ml-auto text-gray-500" />
                                    )}
                                </>
                            )}
                        </button>

                        {/* Dropdown Items */}
                        {openDropdown === complaintsItem.id && isOpen && (
                            <div className="ml-8 mt-2 space-y-1 border-l-2 border-blue-200 pl-3 ">
                                {complaintsItem.dropdown.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        to={sub.id}
                                        onClick={() => {
                                            setActiveItem(sub.id);
                                            if (!isDesktop) setIsOpen(false);
                                        }}
                                        className={`block px-3 py-2 text-sm rounded-md transition bg-gray-100 text-blue-700 shadow-inner
                      ${activeItem === sub.id
                                                ? "bg-green-100 text-green-700 font-semibold"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile Toggle Button */}
            {!isDesktop && (
                <button
                    className="fixed top-4 left-4 z-50 p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 
          text-white shadow-lg rounded-full
          transition duration-300 hover:scale-110 active:scale-95"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
                </button>
            )}
        </>
    );
};

export default ComplaintsSidebar;
