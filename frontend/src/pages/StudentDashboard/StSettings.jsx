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
  // const [fullName, setFullName] = useState("John Doe");
  // const [email, setEmail] = useState("student@example.com");
  const [language, setLanguage] = useState("English");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "other", label: "Preferences", icon: Sliders },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div
      className="md:ml-20 lg:ml-64 px-4  min-h-screen py-10 transition-colors duration-500 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 font-sans"
    
    >
      <div className="w-full max-w-2xl px-4">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-[#1a4480] tracking-tight">
        Settings
        </h1>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-6 mt-6">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              {...tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div
          className="rounded-xl shadow-lg p-6 transition-colors duration-300 bg-white" 
        >
          {activeTab === "profile" && (
            <ProfileTab/>
          )}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "other" && (
            <PreferencesTab
              language={language}
              setLanguage={setLanguage}
            />
          )}
          {activeTab === "support" && <SupportTab/>}
        </div>
      </div>
    </div>
  );
};

export default StSettings;
