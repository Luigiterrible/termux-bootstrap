// src/components/Sidebar.tsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getUserRole, getClientType } from "../utils/storage"; // ✅ Ruta corregida

const fullMenu = [
  { name: "Dashboard", path: "/super-admin/dashboard" },
  {
    name: "Lead Tracking",
    path: "/super-admin/lead-tracking",
    subMenus: [
      { name: "View Leads", path: "/super-admin/lead-tracking/view" },
      { name: "Import Leads", path: "/super-admin/lead-tracking/import" },
    ],
  },
  {
    name: "Verification Workflow",
    path: "/super-admin/verification-workflow",
    subMenus: [
      {
        name: "Pending",
        path: "/super-admin/verification-workflow/pending",
      },
      {
        name: "Verified",
        path: "/super-admin/verification-workflow/verified",
      },
    ],
  },
  {
    name: "Document Management",
    path: "/super-admin/document-management",
    subMenus: [
      {
        name: "Upload",
        path: "/super-admin/document-management/upload",
      },
      {
        name: "Browse",
        path: "/super-admin/document-management/browse",
      },
    ],
  },
  { name: "Communications", path: "/super-admin/communications" },
  { name: "Calendar & Reminders", path: "/super-admin/calendar-reminders" },
  { name: "Forms", path: "/super-admin/forms" },
  { name: "Users", path: "/super-admin/users" },
  { name: "Client Portal", path: "/super-admin/client-portal" },
  { name: "Campaigns", path: "/super-admin/campaigns" },
  { name: "Reports", path: "/super-admin/reports" },
  { name: "Billing", path: "/super-admin/billing" },
  { name: "Integrations", path: "/super-admin/integrations" },
  { name: "AI & Automation", path: "/super-admin/ai-automation" },
  { name: "Settings", path: "/super-admin/settings" },
];

const rolePermissions: Record<string, string[]> = {
  "super-admin": fullMenu.map((item) => item.name),
  admin: [
    "Dashboard",
    "Lead Tracking",
    "Verification Workflow",
    "Document Management",
    "Communications",
    "Calendar & Reminders",
    "Forms",
    "Users",
    "Client Portal",
    "Campaigns",
    "Reports",
    "AI & Automation",
    "Settings",
  ],
  qa: ["Dashboard", "Lead Tracking", "Verification Workflow", "Reports"],
  agent: [
    "Dashboard",
    "Lead Tracking",
    "Verification Workflow",
    "Document Management",
    "Communications",
    "Calendar & Reminders",
  ],
};

const clientRestrictions: Record<string, string[]> = {
  "law-firm": [],
  "intake-center": ["Billing", "Integrations"],
  "call-center": [
    "Billing",
    "Integrations",
    "Reports",
    "Settings",
    "Users",
    "Client Portal",
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<typeof fullMenu>([]);

  useEffect(() => {
    const userRole = getUserRole();
    const clientType = getClientType();

    const allowedByRole = rolePermissions[userRole] || [];
    const blockedByClient = clientRestrictions[clientType] || [];

    const filtered = fullMenu.filter(
      (item) =>
        allowedByRole.includes(item.name) &&
        !blockedByClient.includes(item.name)
    );

    setFilteredMenu(filtered);
  }, []);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Super Admin CRM</h2>
      <ul className="space-y-3 flex-1 overflow-auto">
        {filteredMenu.map((item) => (
          <li key={item.name}>
            {item.subMenus ? (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex justify-between items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition"
                  type="button"
                >
                  <span
                    className={`font-semibold ${
                      item.subMenus.some((sub) => isActivePath(sub.path))
                        ? "text-blue-400"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="ml-2">
                    {openMenus.includes(item.name) ? "▼" : "▶"}
                  </span>
                </button>
                {openMenus.includes(item.name) && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.subMenus.map((sub) => (
                      <li key={sub.path}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded hover:bg-gray-800 transition ${
                              isActive
                                ? "bg-gray-800 text-blue-400 font-semibold"
                                : ""
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gray-800 text-blue-400 font-semibold shadow-md"
                      : "hover:bg-gray-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <footer className="mt-auto text-gray-400 text-center text-sm">
        © 2025 Your Company
      </footer>
    </aside>
  );
}
