import React from "react";
import { Mail, Phone, BookOpen, Megaphone } from "lucide-react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-100 max-w-5xl mx-auto w-full">
      {/* Profile Image */}
      <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
        <img
          src={profile.image}
          alt="Teacher"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-[#104c80]/30"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 text-center md:text-left">
        {/* Name & Role */}
        <h3 className="text-2xl sm:text-3xl font-bold text-[#104c80]">
          {profile.name}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">{profile.role}</p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row sm:justify-start justify-center gap-3 sm:gap-6 mt-4">
          <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base break-all">
            <Mail size={18} className="text-[#104c80]" /> {profile.email}
          </p>
          <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <Phone size={18} className="text-[#104c80]" /> {profile.phone}
          </p>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          {profile.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc] p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <p className="text-lg sm:text-xl font-bold text-[#104c80]">
              {profile.stats.classes}
            </p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-xs sm:text-sm">
              <BookOpen size={14} /> Classes Taken
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc] p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <p className="text-lg sm:text-xl font-bold text-[#104c80]">
              {profile.stats.announcements}
            </p>
            <p className="text-gray-600 flex items-center justify-center gap-1 text-xs sm:text-sm">
              <Megaphone size={14} /> Announcements
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc] p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <p className="text-lg sm:text-xl font-bold text-[#104c80]">
              {profile.stats.experience}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">Years Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
