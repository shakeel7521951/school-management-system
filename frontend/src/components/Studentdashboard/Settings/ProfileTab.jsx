import React, { useState } from "react";
import { Mail, Phone, Save, Pencil, BookOpen, Megaphone } from "lucide-react";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sara",
    role: "Student",
    email: "sara@example.com",
    phone: "+1 234 567 890",
    bio: "A passionate student who loves learning and exploring new opportunities.",
    image: "http://localhost:5173/images/teacher.jpg",
    stats: {
      classes: 12,
      announcements: 5,
      experience: 2,
    },
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved Profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#F0F6FD] min-h-screen flex justify-center items-center px-16">
      <div className="relative bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-6 border border-gray-100 max-w-2xl w-full text-center">
        

        {/* Profile Image */}
        <img
          src={profile.image}
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-[#104c80]/30"
        />

        {/* Profile Details */}
        {isEditing ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-2xl sm:text-3xl font-bold text-[#104c80] border-b border-gray-300 focus:outline-none w-full text-center"
          />
        ) : (
          <h3 className="text-2xl sm:text-3xl font-bold text-[#104c80]">{profile.name}</h3>
        )}
        <p className="text-gray-500 text-sm sm:text-base">{profile.role}</p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-3">
          <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base break-all">
            <Mail size={18} className="text-[#104c80]" />
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border-b border-gray-300 focus:outline-none text-center"
              />
            ) : (
              profile.email
            )}
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <Phone size={18} className="text-[#104c80]" />
            {isEditing ? (
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border-b border-gray-300 focus:outline-none text-center"
              />
            ) : (
              profile.phone
            )}
          </p>
        </div>

        {/* Bio */}
        <div className="mt-4 w-full">
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-[#104C80] text-center"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{profile.bio}</p>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6 w-full">
          <div className="bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc] p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <p className="text-lg sm:text-xl font-bold text-[#104c80]">{profile.stats.classes}</p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-xs sm:text-sm">
              <BookOpen size={14} /> Classes Taken
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc] p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <p className="text-lg sm:text-xl font-bold text-[#104c80]">{profile.stats.announcements}</p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-xs sm:text-sm">
              <Megaphone size={14} /> Announcements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
