import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile, clearProfile } from "../../redux/slices/UserSlice";
import { useLogoutMutation } from "../../redux/slices/UserApi";
import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../redux/slices/languageSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { language } = useSelector((state) => state.language);

  const [openDropdown, setOpenDropdown] = useState(null);

  const profile = useSelector(selectUserProfile);

  const [logout, { isLoading }] = useLogoutMutation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tamakon", path: "/tamakon", dropdown: true },
    { name: "Services", path: "/services", dropdown: true },
    { name: "Media", path: "/media", dropdown: true },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearProfile());
      setProfileOpen(false);
      setIsOpen(false);
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#1A3570] via-[#1A4480] to-[#2E3A87] shadow-lg backdrop-blur">
        <div className="container mx-auto relative flex items-center justify-between px-3 sm:px-4 md:px-6 py-3">
          {/* Logo */}
          <NavLink
            to="/"
            className="w-[100px] xs:w-[110px] sm:w-[130px] md:w-[150px] h-[50px] xs:h-[55px] sm:h-[65px] md:h-[75px] flex-shrink-0"
          >
            <img
              src="./images/Tamakon-logo.png"
              alt="Tamakon Logo"
              className="w-full h-full object-contain"
            />
          </NavLink>

          {/* Desktop Navigation Links - Center */}
          <ul className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.name} className="relative group mx-2">
                  <button className="relative pb-1 text-gray-200 hover:text-indigo-300 transition duration-300 flex items-center gap-1 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300 px-3 py-2">
                    {link.name}
                    <svg
                      className="w-4 h-4 transform group-hover:rotate-180 transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdowns */}
                  {link.name === "Tamakon" && (
                    <div className="absolute text-[15px] overflow-hidden left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50">
                      <NavLink
                        to="/about-tamakon"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        About Tamakon
                      </NavLink>
                      <NavLink
                        to="/tamakon-team"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Team
                      </NavLink>
                      <NavLink
                        to="/director-message"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Director Manager Message
                      </NavLink>
                      <NavLink
                        to="/acting-director-message"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Acting Director General Message
                      </NavLink>
                      <NavLink
                        to="/school-fees"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        School Fees
                      </NavLink>
                      <NavLink
                        to="/recruitment"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Recruitment
                      </NavLink>
                      <NavLink
                        to="/faqs"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        FAQs
                      </NavLink>
                    </div>
                  )}

                  {link.name === "Services" && (
                    <div className="font-base text-[15px] absolute left-24 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50">
                      {/* Academic Services with dropdown */}
                      <div className="relative group/submenu ">
                        <button className="w-full  text-left px-4 py-2 hover:text-indigo-700 flex justify-between items-center">
                          Academic Services
                          <span className="ml-2">▸</span>
                        </button>

                        {/* Submenu for Academic Services */}
                        <div className="absolute top-10 right-full  mr-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95  group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50">
                          <NavLink
                            to="/middle-unit"
                            className="block px-4  py-2 hover:text-indigo-700"
                          >
                            Middle and High Unit for Multiple Intelligences and
                            Talents (Boys)
                          </NavLink>
                          <NavLink
                            to="/primary-unit"
                            className="block px-4 py-2 hover:overflow-hidden hover:text-indigo-700"
                          >
                            Primary Unit for Multiple Intelligences and Talents
                            – Boys and Girls
                          </NavLink>
                          <NavLink
                            to="/educational-unit"
                            className="block px-4 py-2 hover:overflow-hidden hover:text-indigo-700"
                          >
                            Specialized Education Unit
                          </NavLink>
                        </div>
                      </div>

                      {/* Other Services */}
                      <NavLink
                        to="/public-relations"
                        className="hover:overflow-hidden block px-4 py-2 hover:text-indigo-700"
                      >
                        Public Relations Department
                      </NavLink>

                      <div className="relative group/submenu ">
                        <button className="w-full text-left px-4 py-2 hover:text-indigo-700 flex justify-between items-center">
                          Speech & Language Therapy
                          <span className="ml-2">▸</span>
                        </button>

                        <div className="absolute top-0 right-full mr-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50">
                          <NavLink
                            to="/speech-therapy"
                            className="block px-4 py-2 hover:text-indigo-700"
                          >
                            Speech & Language Therapy
                          </NavLink>
                          <NavLink
                            to="/vocational-rehabilitation"
                            className="block px-4 py-2 hover:text-indigo-700"
                          >
                            Vocational & Physical Rehabilitation Department
                          </NavLink>
                        </div>

                        <div className=' absolute top-8 left-[-550px] w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50'>
                          <NavLink to='/nursing-department' className='block px-4 py-2 hover:text-indigo-700'>Nursing Department</NavLink>
                        </div>
                      </div>

                      <NavLink
                        to="/financial-affairs"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Financial & Administrative Affairs
                      </NavLink>
                    </div>
                  )}

                  {link.name === "Media" && (
                    <div className="absolute text-[15px] overflow-hidden left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50">
                      <NavLink
                        to="/news"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        News
                      </NavLink>
                      <NavLink
                        to="/gallery"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        Gallery
                      </NavLink>
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.name} className="mx-2">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative pb-1 transition duration-300 px-3 py-2 ${isActive
                        ? "text-indigo-300 font-semibold after:w-full"
                        : "text-gray-200 hover:text-indigo-300 after:w-0 hover:after:w-full"
                      } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Right Section - Search and Login/Profile */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Language Toggle Button - Desktop */}
            <button
              onClick={() => dispatch(toggleLanguage())}
              className="hidden md:flex px-3 py-2 border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/10 transition duration-300 whitespace-nowrap"
            >
              {language === "en" ? "عربي" : "English"}
            </button>

            {/* Login/Profile - Desktop & Tablet */}
            <div className="hidden md:block">
              {!profile ? (
                <NavLink
                  to="/login"
                  className="px-4 py-2 md:px-5 md:py-2 bg-[#104c80]/80 backdrop-blur-md border border-white/30 
                             rounded-full text-white font-semibold shadow-md text-sm md:text-base
                             hover:bg-[#104c80] hover:shadow-lg hover:shadow-[#104c80]/40 
                             hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Login
                </NavLink>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition"
                  >
                    {profile?.profilePic ? (
                      <img
                        src={profile.profilePic}
                        alt="Profile"
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-indigo-400"
                      />
                    ) : (
                      <FaUserCircle className="text-xl md:text-2xl" />
                    )}
                    <span className="hidden lg:inline">
                      {profile?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                      <NavLink
                        to="/my-profile"
                        className="block px-4 py-2 hover:text-indigo-700"
                      >
                        My Profile
                      </NavLink>
                      {profile?.role === "admin" && (
                        <NavLink
                          to="/studentcomplain"
                          className="block px-4 py-2 hover:text-indigo-700"
                        >
                          Admin Dashboard
                        </NavLink>
                      )}
                      {profile?.role === "teacher" && (
                        <NavLink
                          to="/teacherdocuments"
                          className="block px-4 py-2 hover:text-indigo-700"
                        >
                          Teacher Dashboard
                        </NavLink>
                      )}
                      {profile?.role === "visitor" && (
                        <NavLink
                          to="/visitor"
                          className="block px-4 py-2 hover:text-indigo-700"
                        >
                          Visitor Dashboard
                        </NavLink>
                      )}
                      {profile?.role?.toLowerCase() === "student" && (
                        <NavLink
                          to="/stcomplaints"
                          className="block px-4 py-2 hover:text-indigo-700"
                        >
                          Student Dashboard
                        </NavLink>
                      )}
                      {profile?.role?.toLowerCase() === "guard" && (
                        <NavLink
                          to="/visitor"
                          className="block px-4 py-2 hover:text-indigo-700"
                        >
                          Security Dashboard
                        </NavLink>
                      )}
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                      >
                        {isLoading ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded bg-indigo-900/70 hover:bg-indigo-800 transition"
              onClick={() => setIsOpen(true)}
            >
              <FaBars className="text-indigo-200 text-lg" />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-gradient-to-b from-[#1A3570] to-[#2E3A87] border-l border-indigo-400 shadow-2xl transform transition-transform duration-300 z-50 p-4 sm:p-6 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-indigo-800 rounded-lg"
          >
            <FaTimes className="text-indigo-200 text-xl" />
          </button>
        </div>

        {/* Mobile Links with Dropdowns */}
        <ul className="flex flex-col gap-2 text-base font-medium mb-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {!link.dropdown ? (
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition duration-300 ${isActive
                      ? "bg-indigo-800 text-indigo-300 font-semibold"
                      : "text-indigo-100 hover:text-indigo-300 hover:bg-indigo-800/30"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex justify-between items-center w-full py-3 px-4 rounded-lg text-indigo-100 hover:text-indigo-300 hover:bg-indigo-800/30"
                  >
                    <span>{link.name}</span>
                    <span>{openDropdown === link.name ? "▲" : "▼"}</span>
                  </button>

                  {/* Tamakon Dropdown */}
                  {link.name === "Tamakon" && openDropdown === "Tamakon" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      <NavLink
                        to="/about-tamakon"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        About Tamakon
                      </NavLink>
                      <NavLink
                        to="/tamakon-team"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Team
                      </NavLink>
                      <NavLink
                        to="/director-message"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Director Manager Message
                      </NavLink>
                      <NavLink
                        to="/acting-director-message"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Acting Director General Message
                      </NavLink>
                      <NavLink
                        to="/school-fees"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        School Fees
                      </NavLink>
                      <NavLink
                        to="/recruitment"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Recruitment
                      </NavLink>
                      <NavLink
                        to="/faqs"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        FAQs
                      </NavLink>
                    </div>
                  )}

                  {/* Services Dropdown */}
                  {link.name === "Services" && openDropdown === "Services" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      <NavLink
                        to="/public-relations"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Public Relations Department
                      </NavLink>
                      <NavLink
                        to="/speech-therapy"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Speech & Language Therapy
                      </NavLink>
                      <NavLink
                        to="/vocational-rehabilitation"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Vocational & Physical Rehabilitation Department
                      </NavLink>
                      <NavLink
                        to="/nursing-department"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Nursing Department
                      </NavLink>
                      <NavLink
                        to="/financial-affairs"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Financial & Administrative Affairs
                      </NavLink>
                      <NavLink
                        to="/middle-unit"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Middle and High Unit for Multiple Intelligences (Boys)
                      </NavLink>
                      <NavLink
                        to="/primary-unit"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Primary Unit for Multiple Intelligences – Boys & Girls
                      </NavLink>
                      <NavLink
                        to="/educational-unit"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Specialized Education Unit
                      </NavLink>
                    </div>
                  )}

                  {link.name === "Media" && openDropdown === "Media" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      <NavLink
                        to="/news"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        News
                      </NavLink>
                      <NavLink
                        to="/gallery"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-indigo-100 hover:text-indigo-300 text-sm"
                      >
                        Gallery
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}

        </ul>

        {/* Mobile Login/Profile (inside sidebar) */}
        <div className="mt-auto border-t border-indigo-400 pt-4">
          {!profile ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 bg-gradient-to-r from-[#104c80] to-[#104c80]/30 rounded-full text-center text-white font-semibold shadow-md hover:shadow-lg transition mb-4"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-800 rounded-full text-indigo-200 hover:bg-indigo-700 hover:text-white transition mb-2"
              >
                {profile?.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-indigo-400"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
                <span className="font-medium">
                  {profile?.name?.split(" ")[0]}
                </span>
              </button>

              {profileOpen && (
                <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <NavLink
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:text-indigo-700 transition"
                    onClick={() => {
                      setProfileOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    My Profile
                  </NavLink>
                  {profile?.role === "admin" && (
                    <NavLink
                      to="/studentcomplain"
                      className="block px-4 py-2 text-gray-700 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  {profile?.role === "guard" && (
                    <NavLink
                      to="/visitor"
                      className="block px-4 py-2 text-gray-700 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Visitor Dashboard
                    </NavLink>
                  )}
                  {profile?.role === "teacher" && (
                    <NavLink
                      to="/teacherdocuments"
                      className="block px-4 py-2 text-gray-700 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Teacher Dashboard
                    </NavLink>
                  )}
                  {profile?.role?.toLowerCase() === "student" && (
                    <NavLink
                      to="/stcomplaints"
                      className="block px-4 py-2 text-gray-700 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Student Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => dispatch(toggleLanguage())}
            className="px-3 py-2 border rounded"
          >
            {language === "en" ? "عربي" : "English"}
          </button>
        </div>
      </div>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-[70px] sm:h-[80px] md:h-[90px]"></div>
    </>
  );
}