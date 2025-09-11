import React from "react";
import { Sliders, Globe, Moon, Bell } from "lucide-react";

const PreferencesTab = ({ language, setLanguage, darkMode, setDarkMode, notifications, setNotifications }) => (
  <>
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Sliders size={20} /> Preferences
    </h2>
    <div className="space-y-5">
      {/* Language */}
      <div>
        <label className=" text-sm font-medium flex items-center gap-2">
          <Globe size={18} /> Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#104C80] outline-none"
        >
          <option>English</option>
          <option>العربية</option>
        </select>
      </div>

      {/* Dark Mode */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          className="w-4 h-4 accent-[#104C80]"
        />
        <label className="text-sm flex items-center gap-2">
          <Moon size={18} /> Enable Dark Mode
        </label>
      </div>

      {/* Notifications */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          className="w-4 h-4 accent-[#104C80]"
        />
        <label className="text-sm flex items-center gap-2">
          <Bell size={18} /> Email Notifications
        </label>
      </div>
    </div>
  </>
);

export default PreferencesTab;
