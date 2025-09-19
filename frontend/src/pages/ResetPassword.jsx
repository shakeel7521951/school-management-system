import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/slices/UserApi"; 
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await resetPassword({ email, password }).unwrap();
      toast.success(response?.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-[#104c80] via-[#0d3a63] to-[#082845]">
      <div className="w-full max-w-2xl bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#0d3a63] py-6 px-4 sm:px-8 text-center shadow-md">
          <h1 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide">
            Reset Password
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Enter your new password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* New Password */}
          <div className="mb-6">
            <label className="block text-white/90 font-semibold mb-2">New Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-white/90 font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40 disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
