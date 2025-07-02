// src/components/super-admin/SuperAdminLayout.tsx
import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react"; // ícono hamburguesa

const menuItems = [
  { label: "Dashboard", path: "/super-admin" },
  { label: "Lead Tracking", path: "/super-admin/lead-tracking" },
  { label: "Verification Workflow", path: "/super-admin/verification-workflow" },
  { label: "Document Management", path: "/super-admin/document-management" },
  { label: "Communications", path: "/super-admin/communications" },
  { label: "Calendar & Reminders", path: "/super-admin/calendar-reminders" },
  { label: "Forms", path: "/super-admin/forms" },
  { label: "Users", path: "/super-admin/users" },
  { label: "Client Portal", path: "/super-admin/client-portal" },
  { label: "Campaigns", path: "/super-admin/campaigns" },
  { label: "Reports", path: "/super-admin/reports" },
  { label: "Billing", path: "/super-admin/billing" },
  { label: "Integrations", path: "/super-admin/integrations" },
  { label: "AI & Automation", path: "/super-admin/ai-automation" },
  { label: "Settings", path: "/super-admin/settings" },
];

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-blue-900 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Super Admin</h2>
          <ul className="space-y-2">
            {menuItems.map(({ label, path }) => {
              const isActive =
                location.pathname === path ||
                (label === "Dashboard" && location.pathname === "/super-admin");
              return (
                <li
                  key={path}
                  className={`${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  } px-3 py-2 rounded`}
                >
                  <Link to={path}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white shadow px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">
            Super Admin Dashboard
          </h1>
          <div /> {/* espacio reservado para futuro (perfil, notificaciones, etc.) */}
        </div>

        {/* Main Area */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
