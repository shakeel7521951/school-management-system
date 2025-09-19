import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-[#104c80] via-[#0d3a63] to-[#082845]">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-3xl bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#0d3a63] py-6 px-4 sm:px-8 text-center shadow-md">
          <h1 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide">
            Create Hope Today
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Sign up to start your journey
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          
          {/* Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
            {/* Full Name */}
            <div>
              <label className="block text-white/90 font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/90 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Password */}
            <div>
              <label className="block text-white/90 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-[#0d3a63] transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/90 font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                  size={18}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-[#0d3a63] transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Signup Button */}
          <div className="flex justify-center">
            <button className="w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40">
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-white/80 cursor-pointer">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-white hover:text-white/80 hover:underline font-medium transition-colors"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
