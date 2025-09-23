import { useState } from 'react'
import { FaBars, FaTimes, FaUserCircle, FaSearch } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserProfile, clearProfile } from '../../redux/slices/UserSlice'
import { useLogoutMutation } from '../../redux/slices/UserApi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profile = useSelector(selectUserProfile)
  const dispatch = useDispatch()

  const [logout, { isLoading }] = useLogoutMutation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tamakon', path: '/tamakon', dropdown: true },
    { name: 'Services', path: '/services', dropdown: true },
    { name: 'Media', path: '/media' },
    { name: 'Contact Us', path: '/contact-us' }
  ]

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearProfile())
      setProfileOpen(false)
      setIsOpen(false)
    } catch (err) {
      console.error('❌ Logout failed:', err)
    }
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#1A3570] via-[#1A4480] to-[#2E3A87] shadow-lg backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="w-[160px] h-[75px]">
          <img
            src="./images/Tamakon-logo.png"
            alt="Tamakon Logo"
            className="w-full h-full object-contain"
          />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-10 text-[17px] font-medium">
          {navLinks.map((link) =>
            link.name === 'Tamakon' || link.name === 'Services' ? (
              <li key={link.name} className="relative group">
                <button className="relative pb-1 text-gray-200 hover:text-indigo-300 transition duration-300 flex items-center gap-1 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300">
                  {link.name}
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-180 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                {link.name === 'Tamakon' && (
                  <div className="absolute text-[15px] overflow-hidden left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50">
                    <NavLink to="/about-tamakon" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">About Tamakon</NavLink>
                    <NavLink to="/team" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Team</NavLink>
                    <NavLink to="/director-message" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Director Manager Message</NavLink>
                    <NavLink to="/acting-director-message" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Acting Director General Message</NavLink>
                    <NavLink to="/school-fees" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">School Fees</NavLink>
                    <NavLink to="/recruitment" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Recruitment</NavLink>
                    <NavLink to="/faqs" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">FAQs</NavLink>
                  </div>
                )}

                {link.name === 'Services' && (
                  <div className="font-semibold text-[15px] absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50">
                    <NavLink to="/academy-services" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Academic Services</NavLink>
                    <NavLink to="/public-relations" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Public Relations Department</NavLink>

                    {/* Parent hover: Speech & Language Therapy */}
                    <div className="relative group/submenu">
                      <button className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between items-center">
                        Speech & Language Therapy <span className="ml-2">▸</span>
                      </button>

                      {/* Dropdown 1 */}
                      <div className="absolute top-0 right-full mr-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50">
                        <NavLink to="/speech-therapy" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Speech & Language Therapy</NavLink>
                        <NavLink to="/vocational-rehabilitation" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Vocational & Physical Rehabilitation Department</NavLink>
                      </div>

                      {/* Dropdown 2 */}
                      <div className="absolute top-14 left-[-615px] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50">
                        <NavLink to="/nursing-department" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Nursing Department</NavLink>
                      </div>
                    </div>

                    <NavLink to="/financial-affairs" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Financial & Administrative Affairs</NavLink>
                  </div>
                )}
              </li>
            ) : (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative pb-1 transition duration-300 ${
                      isActive
                        ? 'text-indigo-300 font-semibold after:w-full'
                        : 'text-gray-200 hover:text-indigo-300 after:w-0 hover:after:w-full'
                    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            )
          )}

          {/* Search Icon */}
          <li>
            <button className="text-gray-200 hover:text-indigo-300 transition">
              <FaSearch className="text-lg" />
            </button>
          </li>

          {/* Login/Profile */}
          <li className="relative">
            {!profile ? (
              <NavLink
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
              >
                Login
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition"
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
                  <span>{profile?.name?.split(' ')[0]}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                    <NavLink to="/my-profile" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">
                      My Profile
                    </NavLink>
                    {profile?.role === 'admin' && (
                      <NavLink to="/admincomplain" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">
                        Admin Dashboard
                      </NavLink>
                    )}
                    {profile?.role === 'teacher' && (
                      <NavLink to="/teacherdocuments" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">
                        Teacher Dashboard
                      </NavLink>
                    )}
                    {profile?.role === 'User' && (
                      <NavLink to="/stcomplaints" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">
                        Student Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      {isLoading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded bg-indigo-900/70 hover:bg-indigo-800 transition"
          onClick={() => setIsOpen(true)}
        >
          <FaBars className="text-indigo-200 text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 border-l border-indigo-500/20 shadow-2xl transform transition-transform duration-300 z-50 p-6 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top */}
        <div className="flex justify-between items-center mb-10">
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300"
            onClick={() => setIsOpen(false)}
          >
            Al Tamakon
          </NavLink>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-indigo-950 rounded">
            <FaTimes className="text-indigo-200 text-2xl" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-center py-2 rounded-lg transition duration-300 ${
                    isActive
                      ? 'bg-indigo-800 text-indigo-300 font-semibold'
                      : 'text-indigo-100 hover:text-indigo-300 hover:bg-indigo-800/30'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Login/Profile */}
        <div className="mt-10 flex flex-col gap-4 relative">
          {!profile ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-center text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition"
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
                <span className="font-medium">{profile?.name.split(' ')[0]}</span>
              </button>

              {profileOpen && (
                <div className="mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <NavLink
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    onClick={() => {
                      setProfileOpen(false)
                      setIsOpen(false)
                    }}
                  >
                    My Profile
                  </NavLink>
                  {profile?.role === 'admin' && (
                    <NavLink
                      to="/admincomplain"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false)
                        setIsOpen(false)
                      }}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  {profile?.role === 'teacher' && (
                    <NavLink
                      to="/teacherdocuments"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false)
                        setIsOpen(false)
                      }}
                    >
                      Teacher Dashboard
                    </NavLink>
                  )}
                  {profile?.role === 'User' && (
                    <NavLink
                      to="/stcomplaints"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false)
                        setIsOpen(false)
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
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
