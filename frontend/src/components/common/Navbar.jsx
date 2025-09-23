import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaUserCircle, FaSearch } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserProfile, clearProfile } from '../../redux/slices/UserSlice'
import { useLogoutMutation } from '../../redux/slices/UserApi'

// Mock search data - replace with your actual data or API calls
const searchData = [
  { id: 1, title: 'About Tamakon', path: '/about-tamakon', category: 'Tamakon' },
  { id: 2, title: 'Our Team', path: '/team', category: 'Tamakon' },
  { id: 3, title: 'Director Message', path: '/director-message', category: 'Tamakon' },
  { id: 4, title: 'Academic Services', path: '/academy-services', category: 'Services' },
  { id: 5, title: 'Speech Therapy', path: '/speech-therapy', category: 'Services' },
  { id: 6, title: 'Nursing Department', path: '/nursing-department', category: 'Services' },
  { id: 7, title: 'Media Gallery', path: '/media', category: 'Media' },
  { id: 8, title: 'Contact Information', path: '/contact-us', category: 'Contact' },
  { id: 9, title: 'School Fees', path: '/school-fees', category: 'Tamakon' },
  { id: 10, title: 'Recruitment', path: '/recruitment', category: 'Tamakon' },
  { id: 11, title: 'FAQs', path: '/faqs', category: 'Tamakon' },
  { id: 12, title: 'Public Relations', path: '/public-relations', category: 'Services' },
  { id: 13, title: 'Financial Affairs', path: '/financial-affairs', category: 'Services' },
  { id: 14, title: 'Vocational Rehabilitation', path: '/vocational-rehabilitation', category: 'Services' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const profile = useSelector(selectUserProfile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logout, { isLoading }] = useLogoutMutation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tamakon', path: '/tamakon', dropdown: true },
    { name: 'Services', path: '/services', dropdown: true },
    { name: 'Media', path: '/media' },
    { name: 'Contact Us', path: '/contact-us' }
  ]

  // Search functionality (live filter)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setSearchResults(filteredResults)
    setShowResults(true)
  }, [searchQuery])

  const handleSearch = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page or handle search
      navigate('/search', { state: { query: searchQuery, results: searchResults } })
      setSearchQuery('')
      setShowResults(false)
      setSearchOpen(false)
    }
  }

  const handleSearchItemClick = (path) => {
    navigate(path)
    setSearchQuery('')
    setShowResults(false)
    setSearchOpen(false)
    setIsOpen(false)
  }

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
    <>
      {/* Top Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#1A3570] via-[#1A4480] to-[#2E3A87] shadow-lg backdrop-blur">
        {/* make container relative so absolute dropdowns inside align to this container */}
        <div className="container mx-auto relative flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo - Left Side */}
          <NavLink to='/' className='w-[120px] sm:w-[140px] md:w-[160px] h-[60px] sm:h-[70px] md:h-[75px] flex-shrink-0'>
            <img
              src='./images/Tamakon-logo.png'
              alt='Tamakon Logo'
              className='w-full h-full object-contain'
            />
          </NavLink>

          {/* Desktop Navigation Links - Center */}
          <ul className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.name} className="relative group mx-2">
                  <button
                    className="relative pb-1 text-gray-200 hover:text-indigo-300 transition duration-300 flex items-center gap-1 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300 px-3 py-2"
                  >
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
                  {link.name === 'Tamakon' && (
                    <div className='absolute text-[15px] overflow-hidden left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50'>
                      <NavLink to='/about-tamakon' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>About Tamakon</NavLink>
                      <NavLink to='/team' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Team</NavLink>
                      <NavLink to='/director-message' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Director Manager Message</NavLink>
                      <NavLink to='/acting-director-message' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Acting Director General Message</NavLink>
                      <NavLink to='/school-fees' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>School Fees</NavLink>
                      <NavLink to='/recruitment' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Recruitment</NavLink>
                      <NavLink to='/faqs' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>FAQs</NavLink>
                    </div>
                  )}

                  {link.name === 'Services' && (
                    <div className='font-semibold text-[15px] absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 origin-top z-50'>
                      <NavLink to='/academy-services' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Academic Services</NavLink>
                      <NavLink to='/public-relations' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Public Relations Department</NavLink>

                      <div className='relative group/submenu'>
                        <button className='w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 flex justify-between items-center'>
                          Speech & Language Therapy
                          <span className='ml-2'>▸</span>
                        </button>

                        <div className='absolute top-0 right-full mr-1 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50'>
                          <NavLink to='/speech-therapy' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Speech & Language Therapy</NavLink>
                          <NavLink to='/vocational-rehabilitation' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Vocational & Physical Rehabilitation Department</NavLink>
                        </div>

                        <div className='absolute top-14 left-[-615px] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 scale-95 group-hover/submenu:opacity-100 group-hover/submenu:scale-100 invisible group-hover/submenu:visible transition-all duration-300 origin-top-right z-50'>
                          <NavLink to='/nursing-department' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Nursing Department</NavLink>
                        </div>
                      </div>

                      <NavLink to='/financial-affairs' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Financial & Administrative Affairs</NavLink>
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
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search pages, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent w-48 lg:w-56 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 text-gray-200 hover:text-indigo-300 transition"
                  >
                    <FaSearch className="text-lg" />
                  </button>
                </form>

                {/* Search Results Dropdown (desktop) */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchItemClick(result.path)}
                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-800">{result.title}</div>
                        <div className="text-sm text-gray-500 mt-1">in {result.category}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showResults && searchQuery && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No results found for "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Icon - Mobile */}
            <button
              className="md:hidden text-gray-200 hover:text-indigo-300 transition p-2"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch className="text-lg" />
            </button>

            {/* Login/Profile - Desktop */}
            <div className="hidden lg:block">
              {!profile ? (
                <NavLink
                  to="/login"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 whitespace-nowrap"
                >
                  Login
                </NavLink>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className='flex items-center gap-2 px-4 py-2 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition'
                  >
                    {profile?.profilePic ? (
                      <img
                        src={profile.profilePic}
                        alt='Profile'
                        className='w-8 h-8 rounded-full object-cover border border-indigo-400'
                      />
                    ) : (
                      <FaUserCircle className='text-2xl' />
                    )}
                    <span className="hidden xl:inline">{profile?.name?.split(' ')[0]}</span>
                  </button>

                  {profileOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn'>
                      <NavLink to='/my-profile' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>My Profile</NavLink>
                      {profile?.role === 'admin' && <NavLink to='/admincomplain' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Admin Dashboard</NavLink>}
                      {profile?.role === 'teacher' && <NavLink to='/teacherdocuments' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Teacher Dashboard</NavLink>}
                      {profile?.role?.toLowerCase() === 'user' && <NavLink to='/stcomplaints' className='block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700'>Student Dashboard</NavLink>}
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition'
                      >
                        {isLoading ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded bg-indigo-900/70 hover:bg-indigo-800 transition"
              onClick={() => setIsOpen(true)}
            >
              <FaBars className="text-indigo-200 text-xl" />
            </button>
          </div>

          {/* Mobile Search Bar (dropdown under navbar on small screens) */}
          {searchOpen && (
            <div className="absolute top-full left-0 right-0 bg-indigo-900 p-4 shadow-lg md:hidden z-50">
              <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search pages, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 bg-indigo-900 text-white placeholder-gray-300 border border-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition"
                >
                  <FaSearch />
                </button>
              </form>

              {/* Mobile Search Results */}
              {searchResults.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchItemClick(result.path)}
                      className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-800">{result.title}</div>
                      <div className="text-sm text-gray-500 mt-1">in {result.category}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results Message - Mobile */}
              {searchQuery && searchResults.length === 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No results found for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar (all mobile content inside this block) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-indigo-950 border-l border-indigo-800 shadow-2xl transform transition-transform duration-300 z-50 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300"
            onClick={() => setIsOpen(false)}
          >
            Al Tamakon
          </NavLink>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-indigo-800 rounded"
          >
            <FaTimes className="text-indigo-200 text-2xl" />
          </button>
        </div>

        {/* Mobile Search inside sidebar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Search pages, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-indigo-900 text-white placeholder-gray-300 border border-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition"
            >
              <FaSearch />
            </button>
          </form>

          {/* Search Results in Sidebar (solid style) */}
          {searchResults.length > 0 && (
            <div className="bg-indigo-900 rounded-xl overflow-hidden max-h-40 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSearchItemClick(result.path)}
                  className="w-full text-left px-4 py-2 hover:bg-indigo-800 transition duration-200 border-b border-indigo-800 last:border-b-0"
                >
                  <div className="font-medium text-white">{result.title}</div>
                  <div className="text-sm text-gray-300">in {result.category}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-4 text-lg font-medium mb-8">
          {navLinks.map((link) => (
            <li key={link.name}>
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
            </li>
          ))}
        </ul>

        {/* Mobile Login/Profile (inside sidebar) */}
        <div className="mt-auto">
          {!profile ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-center text-white font-semibold shadow-md hover:shadow-lg transition mb-4"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition mb-2"
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
                  {profile?.role?.toLowerCase() === "user" && (
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

      {/* Overlay for search results (so clicking outside closes suggestions) */}
      {showResults && searchResults.length > 0 && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setShowResults(false)}
        />
      )}
    </>
  )
}
