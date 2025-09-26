import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../redux/slices/UserSlice";
import { useLogoutMutation, useUpdatePasswordMutation } from "../redux/slices/UserApi";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaLock, FaTimes, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const profile = useSelector(selectUserProfile);
  const [updatePassword] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Local state for image preview
  const [profileImage, setProfileImage] = useState(profile?.profilePic || null);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap(); // call backend logout
      dispatch(clearProfile());         // clear Redux user state
      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword
      }).unwrap();

      toast("Password updated successfully!");
      setShowModal(false);
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Password update failed:", err);
      toast.error("Failed to update password. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);

      // 🔹 TODO: send file to backend via API (upload to server or cloud)
      console.log("Profile picture selected:", file);
    }
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-gray-100">
      {/* Card Container */}
      <div className="relative bg-white shadow-xl rounded-3xl w-full max-w-lg text-center overflow-hidden">
        {/* Gradient Header */}
        <div className="h-36 bg-[#104c80]"></div>

        {/* Profile Image with Edit */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <FaUserCircle className="w-28 h-28 text-gray-300 bg-gray-200 rounded-full border-4 border-white shadow-lg" />
            )}

            {/* Camera Icon for Upload */}
            <label
              htmlFor="profile-upload"
              className="absolute bottom-1 right-1 bg-[#104c80] text-white p-2 rounded-full 
                         cursor-pointer shadow-md hover:bg-[#08345d] transition"
            >
              <FaCamera size={14} />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-20 px-6 pb-8">
          {/* User Name */}
          <h2 className="text-3xl font-extrabold text-gray-900">
            {profile?.name}
          </h2>

          {/* Role */}
          <p className="text-[#104c80] font-medium text-sm mt-1">
            {profile?.role}
          </p>

          {/* Email & Phone */}
          <p className="text-gray-600 text-sm mt-2">{profile?.email}</p>
          <p className="text-gray-600 text-sm">{profile?.phone || "+1 234 567 890"}</p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 items-center">
            {/* Change Password */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#104c80] text-white px-5 py-2 rounded-full font-medium shadow hover:bg-[#08345d] transition w-auto"
            >
              Change Password
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 font-medium border border-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <FaTimes size={18} />
              </button>

              <h2 className="text-xl font-semibold text-[#104c80] mb-6 text-center">
                Change Password
              </h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                {[
                  { label: "Old Password", name: "currentPassword" },
                  { label: "New Password", name: "newPassword" },
                  { label: "Confirm New Password", name: "confirmPassword" },
                ].map((field, idx) => (
                  <div key={idx} className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder={field.label}
                      value={passwords[field.name]}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          [field.name]: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80] outline-none bg-gray-50"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-[#104c80] text-white py-3 rounded-lg font-medium shadow hover:bg-[#08345d] transition"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
