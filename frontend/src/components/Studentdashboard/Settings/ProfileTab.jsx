import React, { useState } from "react";
import { User, Mail, Save } from "lucide-react";

const ProfileTab = () => {
  // Local state for inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();

    // Example: save the data (API call or console log)
    console.log("Saved:", { fullName, email });

    // Reset input fields after saving
    setFullName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 max-w-lg mx-auto "
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 ">
        <User size={22} className="text-[#104C80]" /> Profile Settings
      </h2>

      {/* Full Name Input */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <User size={18} className="text-gray-500" /> Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104C80] focus:border-[#104C80] outline-none transition"
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
          <Mail size={18} className="text-gray-500" /> Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104C80] focus:border-[#104C80] outline-none transition"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="mx-auto flex items-center justify-center gap-2 bg-[#104C80] text-white font-medium py-2 px-6 rounded-xl hover:bg-[#0c3a63] hover:shadow-lg active:scale-95 transition-all duration-300 shadow-md"
      >
        <Save size={18} /> Save Changes
      </button>
    </form>
  );
};

export default ProfileTab;
