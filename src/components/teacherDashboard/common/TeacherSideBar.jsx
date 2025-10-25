import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TeacherSidebar = () => {
  const { t, i18n } = useTranslation("teacherSidebar");
  const [sidebarConfig, setSidebarConfig] = useState(
    t("sidebar", { returnObjects: true })
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Update sidebarConfig whenever language changes
  useEffect(() => {
    setSidebarConfig(t("sidebar", { returnObjects: true }));
  }, [i18n.language, t]);

 

  const getIcon = (name, size = 20, color = "currentColor") => {
    const LucideIcon = Icons[name];
    return LucideIcon ? <LucideIcon size={size} color={color} /> : null;
  };

  if (!sidebarConfig) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col justify-between
          transition-all duration-500
          ${isOpen ? "w-64" : "w-0 md:w-20 lg:w-64"} overflow-hidden
          ${sidebarConfig.style?.textColor || "text-white"}
          bg-gradient-to-b ${sidebarConfig.style?.colors?.from || "from-blue-800"} 
          ${sidebarConfig.style?.colors?.via || "via-blue-600"} 
          ${sidebarConfig.style?.colors?.to || "to-blue-400"}
          ${sidebarConfig.style?.shadow || "shadow-2xl"}
        `}
      >
        {/* Header */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-white/10">
          <div
            className={`
              w-14 h-14 flex items-center justify-center
              ${sidebarConfig.header.logo?.shape || "rounded-full"}
              ${sidebarConfig.header.logo?.background || "bg-white/20"}
              shadow-lg ${sidebarConfig.header.logo?.animation || ""}
            `}
          >
            {getIcon(sidebarConfig.header.logo?.icon || "GraduationCap", sidebarConfig.header.logo?.size || 28)}
          </div>
          <h1
            className={`mt-3 font-bold text-base tracking-wide text-center transition-all duration-500
              ${isOpen || window.innerWidth >= 1024 ? "opacity-100" : "hidden"}`}
          >
            {sidebarConfig.header.title || ""}
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 flex flex-col gap-3 px-3 flex-grow">
          {sidebarConfig.menuItems?.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-4 px-3 py-2 rounded-lg 
                         hover:bg-white/20 transition-all relative overflow-hidden
                         hover:translate-x-1 hover:scale-105 duration-300 ease-out"
            >
              <span
                className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 
                           group-hover:scale-y-100 transition-transform duration-300"
              ></span>
              {getIcon(item.icon, item.size)}
              {(isOpen || window.innerWidth >= 1024) && (
                <span className="text-sm font-medium animate-fadeIn">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        className={`
          fixed top-4 left-4 z-50 p-2.5 md:hidden 
          transition duration-300 hover:scale-110 active:scale-95 
          ${sidebarConfig.toggleButton?.style?.background || "bg-blue-600"}
          ${sidebarConfig.toggleButton?.style?.shadow || "shadow-md"}
          ${sidebarConfig.toggleButton?.style?.rounded || "rounded-full"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen
          ? getIcon(
            sidebarConfig.toggleButton?.icons?.open?.icon || "X",
            sidebarConfig.toggleButton?.icons?.open?.size || 22,
            sidebarConfig.toggleButton?.icons?.open?.color || "white"
          )
          : getIcon(
            sidebarConfig.toggleButton?.icons?.closed?.icon || "Menu",
            sidebarConfig.toggleButton?.icons?.closed?.size || 22,
            sidebarConfig.toggleButton?.icons?.closed?.color || "white"
          )}
      </button>
    </>
  );
};

export default TeacherSidebar;
