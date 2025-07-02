// src/components/super-admin/SuperAdminLayout.tsx
import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

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
    <div className="flex h-screen">
      {sidebarOpen && (
        <aside className="w-64 bg-blue-900 text-white p-4">
          <h2 className="text-lg font-bold mb-4">Super Admin</h2>
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

      <main className="flex-1 p-6 overflow-auto bg-gray-100">
        <button
          className="mb-4 bg-gray-200 px-4 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Hide" : "Show"} Menu
        </button>

        {/* Outlet for nested route rendering */}
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
