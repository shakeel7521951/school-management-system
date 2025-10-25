import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { FaChartLine } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, clearProfile } from "../../../redux/slices/UserSlice";
import { useLogoutMutation } from "../../../redux/slices/UserApi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("adminSidebar");
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("admincomplain");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const profile = useSelector(selectUserProfile);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  // 🧩 Department Restriction Logic
  const restrictedDept =
    profile?.department?.name ===
    "Department of Strategic Planning for Quality and School Accreditation";

  const canViewComplaints = !restrictedDept;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const handleLogout = () => {
    navigate("/login");
    logout();
    dispatch(clearProfile());
    if (!isDesktop) setIsOpen(false);
  };

  const app = t("app", { returnObjects: true });
  const systemStatus = t("systemStatus", { returnObjects: true });
  const menuItems = t("menuItems", { returnObjects: true });

  // ✅ Filter complaint routes if user is from restricted department
  const filteredMenuItems = menuItems.filter((item) => {
    if (!canViewComplaints && item.id.includes("complain")) return false;
    if (
      !canViewComplaints &&
      item.dropdown?.some((sub) => sub.id.includes("complain"))
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Overlay for mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-2xl 
          transition-all duration-500 z-50 flex flex-col justify-between
          ${isOpen ? "w-64" : "w-0 lg:w-64"} overflow-hidden`}
      >
        {/* Logo Section */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-gray-200">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-xl ${app.logo.bg} mb-2`}
          >
            {(() => {
              const LogoIcon = Icons[app.logo.icon];
              return LogoIcon ? (
                <LogoIcon size={32} className={app.logo.color} />
              ) : null;
            })()}
          </div>

          {isOpen && (
            <>
              <h2 className="text-xl font-bold text-[#1a4480] tracking-tight">
                {app.name}
              </h2>
              <p className="text-xs text-gray-500">{app.slogan}</p>
            </>
          )}
        </div>

        {/* Menu Section */}
        <nav className="flex-grow space-y-2 mt-6 px-2">
          {filteredMenuItems.map((item) => {
            const IconComponent =
              item.icon === "FaChartLine" ? FaChartLine : Icons[item.icon];
            const isActive = activeItem === item.id;
            const isDropdownOpen = openDropdown === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.dropdown) {
                      setOpenDropdown(isDropdownOpen ? null : item.id);
                    } else {
                      setActiveItem(item.id);
                      navigate(item.id);
                      if (!isDesktop) setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-all
                    ${isActive ? "bg-blue-50 text-blue-700 shadow-inner" : "text-gray-700"}
                    hover:translate-x-1 hover:scale-105`}
                >
                  {IconComponent && (
                    <IconComponent
                      size={20}
                      className={isActive ? "text-blue-700" : item.color}
                    />
                  )}
                  {isOpen && (
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.dropdown &&
                        (isDropdownOpen ? (
                          <Icons.ChevronDown
                            size={16}
                            className="ml-auto text-gray-500"
                          />
                        ) : (
                          <Icons.ChevronRight
                            size={16}
                            className="ml-auto text-gray-500"
                          />
                        ))}
                    </>
                  )}
                </button>

                {/* Dropdown */}
                {item.dropdown && isDropdownOpen && isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.dropdown.map((sub) => {
                      if (!canViewComplaints && sub.id.includes("complain"))
                        return null;

                      return (
                        <Link
                          key={sub.id}
                          to={sub.id}
                          onClick={() => {
                            setActiveItem(sub.id);
                            if (!isDesktop) setIsOpen(false);
                          }}
                          className={`block px-3 py-1.5 text-sm rounded-md
                            ${activeItem === sub.id
                              ? "bg-green-50 text-green-700"
                              : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* System Status + Logout */}
        <div className="px-3 mb-6 space-y-3">
          {isOpen && (
            <div className="mb-4 px-2">
              <div
                className={`h-1.5 w-8 rounded-full ${systemStatus.color} mb-2`}
              ></div>
              <p className="text-xs text-gray-500">{systemStatus.status}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-4 px-3 py-2 rounded-lg
              hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all"
          >
            <Icons.LogOut
              size={20}
              className="text-red-500 group-hover:animate-pulse"
            />
            {isOpen && (
              <span className="text-sm font-medium">{t("logout")}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 p-2.5 bg-blue-600 text-white shadow-lg rounded-full
            transition duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
        </button>
      )}
    </>
  );
};

export default Sidebar;
