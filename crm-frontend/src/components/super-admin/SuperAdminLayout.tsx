// src/components/super-admin/SuperAdminLayout.tsx
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar";

type SuperAdminLayoutProps = {
  children?: ReactNode;
};

const titleMap: Record<string, string> = {
  "": "Dashboard",
  dashboard: "Dashboard",
  "lead-tracking": "Lead Tracking",
  "verification-workflow": "Verification Workflow",
  "document-management": "Document Management",
  communications: "Communications",
  "calendar-reminders": "Calendar & Reminders",
  forms: "Forms",
  users: "Users",
  "client-portal": "Client Portal",
  campaigns: "Campaigns",
  reports: "Reports",
  billing: "Billing",
  integrations: "Integrations",
  "ai-automation": "AI & Automation",
  settings: "Settings",
};

const SidebarHeader = () => (
  <div
    className="bg-gray-800 flex justify-start items-center"
    style={{ height: "100px", padding: "0 8px" }}
  >
    <img
      src="/altair-icon.png"
      alt="Altair Star"
      style={{ maxHeight: "100%", width: "auto", transform: "scale(1.1)" }}
      className="transition-transform duration-500 hover:rotate-12 hover:scale-110"
    />
  </div>
);

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("userRole") || "Guest";

  const pathSegments = location.pathname.split("/").filter(Boolean);
  let key = "";
  if (pathSegments.length > 1 && pathSegments[0] === "super-admin") {
    key = pathSegments[1];
  } else if (pathSegments.length === 1) {
    key = pathSegments[0];
  }

  const pageTitle = titleMap[key] || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen font-sans">
      {sidebarOpen && (
        <div className="flex flex-col w-64 bg-gray-900">
          <SidebarHeader />
          <Sidebar />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
        <div className="flex items-center justify-between bg-white shadow px-6 py-4 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">{pageTitle}</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition"
            >
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border">
                <button
                  onClick={() => alert("View Profile clicked")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={() => alert("Change Password clicked")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
