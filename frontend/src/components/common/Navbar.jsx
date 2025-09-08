import React, { useState } from 'react';
import { HiMenu, HiX, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-center p-1">
      <nav className="relative overflow-hidden border border-indigo-500/20 p-1 w-full max-w-7xl rounded-xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 backdrop-blur-md" />

        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-4 w-4 rounded-full bg-indigo-400/20 animate-float top-4 left-[10%]" />
          <div className="absolute h-3 w-3 rounded-full bg-indigo-400/20 animate-float top-8 left-[20%] [animation-delay:0.5s]" />
          <div className="absolute h-5 w-5 rounded-full bg-indigo-400/20 animate-float top-6 left-[80%] [animation-delay:1s]" />
          <div className="absolute h-6 w-6 rounded-full bg-indigo-400/20 animate-float top-2 left-[60%] [animation-delay:1.5s]" />
        </div>

        {/* Main Navbar Content */}
        <div className="relative px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-lg blur group-hover:blur-md transition-all duration-300" />
                <svg
                  className="relative w-8 sm:w-10 h-8 sm:h-10 text-white transform group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.755 9.755 0 016.116-3.985z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">Mindora</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-15">
              {['Home', 'About', 'Events', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative group overflow-hidden"
                >
                  <span className="text-indigo-100 transition-all duration-300 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-[length:200%_auto] group-hover:animate-gradient-x">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 group-hover:w-full transition-all duration-500 rounded-full" />
                  <span className="absolute inset-0 group-hover:translate-y-[-2px] group-hover:scale-105 transition-all duration-300 ease-out" />
                </a>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              {/* CTA Button */}
              <button className="hidden sm:flex relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" />
                <div className="relative px-5 sm:px-7 py-2 sm:py-3 bg-indigo-950 rounded-lg leading-none flex items-center space-x-2">
                  <Link to="/login" className="text-indigo-200 group-hover:text-white transition duration-200">
                    Login
                  </Link>
                  <HiArrowRight className="w-5 h-5 text-indigo-200 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative group"
                aria-label="Toggle mobile menu"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded blur opacity-60 group-hover:opacity-100 transition duration-200" />
                <div className="relative p-2 bg-indigo-950 rounded leading-none">
                  {isMenuOpen ? (
                    <HiX className="w-6 h-6 text-indigo-200 group-hover:text-white" />
                  ) : (
                    <HiMenu className="w-6 h-6 text-indigo-200 group-hover:text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="relative mt-4 md:hidden animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-900/50 backdrop-blur-sm rounded-lg border border-indigo-500/10">
                {['Home', 'About', 'Events','Contact'].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-center text-base font-medium text-indigo-100 hover:text-white hover:bg-indigo-800/50 transition-all duration-200"
                    >
                      {item}
                    </a>
                  )
                )}
                <div className="px-3 py-2">
                  <button className="w-full relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" />
                    <div className="relative px-4 py-2 bg-indigo-950 rounded-lg leading-none flex items-center justify-center">
                      <Link to="/login" className="text-indigo-200 group-hover:text-white transition duration-200">
                        Login
                      </Link>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;