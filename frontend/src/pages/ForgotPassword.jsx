import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useForgotpasswordotpMutation,
  useVerifyOTPMutation,
} from "../redux/slices/UserApi"; // Adjust path

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState("email"); 
  const [forgotpasswordotp, { isLoading: sendingOtp }] =
    useForgotpasswordotpMutation();
  const [verifyOTP, { isLoading: verifyingOtp }] = useVerifyOTPMutation();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotpasswordotp( email ).unwrap();
      toast.success(response?.message || "OTP sent successfully!");
      setStep("otp"); 
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      const res = await verifyOTP({ email, otp: code }).unwrap();
      toast.success(res?.message || "OTP verified!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-[#104c80] via-[#0d3a63] to-[#082845]">
      <div className="w-full max-w-2xl bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#0d3a63] py-6 px-4 sm:px-8 text-center shadow-md">
          <h1 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide">
            Forgot Password
          </h1>
          <p className="text-white/80 text-sm mt-1">
            {step === "email"
              ? "Enter your email to reset password"
              : "Enter the 4-digit OTP sent to your email"}
          </p>
        </div>

        {/* Step: Email */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="p-6 sm:p-8">
            <label className="block text-white/90 font-semibold mb-2">
              Email Address
            </label>
            <div className="relative mb-6">
              <FaEnvelope
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/60 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={sendingOtp}
                className="w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40 disabled:opacity-50"
              >
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          </form>
        )}

        {/* Step: OTP */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="p-6 sm:p-8 text-center">
            <div className="flex justify-center gap-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-14 h-14 text-center text-xl font-bold text-white bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={verifyingOtp}
              className="w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40 disabled:opacity-50"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
