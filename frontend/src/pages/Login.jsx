import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900">
      {/* Login Card */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden border border-indigo-300/30">
        
        {/* Login Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-4 sm:px-8 text-center">
          <h1 className="text-white font-serif text-2xl sm:text-3xl font-bold">
            Join The Movement
          </h1>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-indigo-900 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-indigo-300 outline-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
            Login
          </button>

          {/* Signup Link */}
          <div className="mt-6 text-center text-indigo-800">
            <span>Don't have an account? </span>
            <a
              href="/signup"
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}