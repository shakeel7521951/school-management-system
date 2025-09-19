import { useState } from "react";
import { useVerifyUserMutation } from "../redux/slices/UserApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerify() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [verifyUser, { isLoading }] = useVerifyUserMutation();
    const location = useLocation();
    const navigate = useNavigate();
    const email = location?.state?.email;
    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // auto-focus next input
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 4) {
            alert("Please enter all 4 digits");
            return;
        }

        try {
            const res = await verifyUser({ email, otp: code }).unwrap();
            navigate("/")
            toast(res?.message);
        } catch (err) {
            toast.error(err?.data?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-[#104c80] via-[#0d3a63] to-[#082845]">
            {/* Card */}
            <div className="w-full max-w-md bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#104c80] to-[#0d3a63] py-6 px-4 sm:px-8 text-center shadow-md">
                    <h1 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide">
                        Verify OTP
                    </h1>
                    <p className="text-white/80 text-sm mt-1">Enter the 4-digit code</p>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 text-center">
                    <div className="flex justify-center gap-4 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className="w-14 h-14 text-center text-xl font-bold text-white bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
}
