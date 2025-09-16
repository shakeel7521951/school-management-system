import React, { useState } from "react";
import { Sliders, User, Lock, HelpCircle } from "lucide-react";
import ProfileTab from "../../components/Studentdashboard/Settings/ProfileTab";
import PreferencesTab from "../../components/Studentdashboard/Settings/PreferencesTab";
import SecurityTab from "../../components/Studentdashboard/Settings/SecurityTab";
import SupportTab from "../../components/Studentdashboard/Settings/SupportTab";
import TabButton from "../../components/Studentdashboard/Settings/TabButton";

const StSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [language, setLanguage] = useState("English");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "other", label: "Preferences", icon: Sliders },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 font-sans">
      <div className="w-full mx-auto flex flex-col justify-center items-center">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-[#1a4480] tracking-tight text-center">
          Settings
        </h1>

        {/* TABS */}
        <div className="flex flex-wrap justify-center ml-40 items-center gap-3 my-6">
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
        <div className="rounded-xl shadow-lg p-6 bg-white transition-colorsn flex items-center justify-center ml-48 box-border duration-300">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "other" && (
            <PreferencesTab language={language} setLanguage={setLanguage} />
          )}
          {activeTab === "support" && <SupportTab />}
        </div>
      </div>
    </div>
  );
};

export default StSettings;
