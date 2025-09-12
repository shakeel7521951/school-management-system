import React, { useState } from "react";
import { Sliders, User, Lock, HelpCircle } from "lucide-react";
import ProfileTab from "../../components/Studentdashboard/Settings/ProfileTab";
import PreferencesTab from "../../components/Studentdashboard/Settings/PreferencesTab";
import SecurityTab from "../../components/Studentdashboard/Settings/SecurityTab";
import SupportTab from "../../components/Studentdashboard/Settings/SupportTab";
import TabButton from "../../components/Studentdashboard/Settings/TabButton";
const StSettings=()=>{
  const [activeTab, setActiveTab] = useState("profile");

  // Global state
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("student@example.com");
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "other", label: "Preferences", icon: Sliders },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div
      className={`min-h-screen flex justify-center py-10 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-2xl px-4">
        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <Sliders size={24} /> Settings {" "}
        </h1>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              {...tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {activeTab === "profile" && (
            <ProfileTab
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
            />
          )}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "other" && (
            <PreferencesTab
              language={language}
              setLanguage={setLanguage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
          {activeTab === "support" && <SupportTab darkMode={darkMode} />}
        </div>
      </div>
    </div>
  );
};

export default StSettings;
