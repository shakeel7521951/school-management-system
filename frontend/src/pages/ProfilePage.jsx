import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../redux/slices/UserSlice";
import { useLogoutMutation } from "../redux/slices/UserApi";
import { FaUserCircle, FaEnvelope, FaPhone, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const profile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#104c80] font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] via-[#d9e4ff] to-[#c0d4ff] flex items-start justify-center py-20 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl flex flex-col gap-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 mt-3">
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#104c80]"
            />
          ) : (
            <FaUserCircle className="text-9xl text-[#104c80]" />
          )}
          <h2 className="text-3xl font-bold text-[#104c80]">{profile.name}</h2>
          <p className="text-[#104c80] font-medium text-lg">{profile.role}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-[#e0f2ff] p-5 rounded-xl shadow hover:shadow-xl transition">
            <FaEnvelope className="text-[#104c80] text-xl" />
            <span className="text-[#104c80] font-medium">{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#e0f2ff] p-5 rounded-xl shadow hover:shadow-xl transition">
            <FaPhone className="text-[#104c80] text-xl" />
            <span className="text-[#104c80] font-medium">{profile.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={handleChangePassword}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#104c80] to-indigo-700 text-white rounded-full font-semibold hover:scale-105 transition transform duration-300 shadow-md"
          >
            <FaKey /> Change Password
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:scale-105 transition transform duration-300 shadow-md"
          >
            <FaSignOutAlt /> {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
