// src/components/Tamakon/team/TeamSection.jsx
import React from "react";
import { TeamMembers } from "./teamData";

export default function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 mt-2 font-medium">
            مدرسة التمكن الشاملة
          </p>
          <div className="mt-4 w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {TeamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Avatar Placeholder */}
              <div className="h-36 w-36 mx-auto -mt-12 rounded-full overflow-hidden border-4 border-indigo-500 shadow">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    member.nameEn
                  )}&background=6366f1&color=fff&size=200`}
                  alt={member.nameEn}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                {/* English */}
                <h3 className="text-lg font-bold text-gray-800">
                  {member.nameEn}
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                  {member.titleEn}
                </p>

                <div className="my-3 border-t border-gray-200"></div>

                {/* Arabic */}
                <h3 className="text-lg font-bold text-gray-800 text-right">
                  {member.nameAr}
                </h3>
                <p className="text-sm text-gray-600 text-right">
                  {member.titleAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
