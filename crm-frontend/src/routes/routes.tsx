// src/routes/routes.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import SuperAdminLayout from "../components/super-admin/SuperAdminLayout";
import UserClientSelector from "../pages/super-admin/UserClientSelector";

import Dashboard from "../pages/super-admin/Dashboard";
import LeadTracking from "../pages/super-admin/LeadTracking";
import VerificationWorkflow from "../pages/super-admin/VerificationWorkflow";
import DocumentManagement from "../pages/super-admin/DocumentManagement";
import Communications from "../pages/super-admin/Communications";
import CalendarReminders from "../pages/super-admin/CalendarReminders";
import Users from "../pages/super-admin/Users";
import ClientPortal from "../pages/super-admin/ClientPortal";
import Campaigns from "../pages/super-admin/Campaigns";
import Reports from "../pages/super-admin/Reports";
import Billing from "../pages/super-admin/Billing";
import Integrations from "../pages/super-admin/Integrations";
import AIIntegration from "../pages/super-admin/AIIntegration";
import Settings from "../pages/super-admin/Settings";

// Correct imports for lead-intake components (adjusted for folder structure)
import FormBuilder from "../../components/lead-intake/FormBuilder";
import ActiveForms from "../../components/lead-intake/ActiveForms";
import InactiveForms from "../../components/lead-intake/InactiveForms";

// 👇 Import the Role type
import { Role } from "../config/widgetsConfig";

// 👇 Role-safe helper
const getUserRoleFromStorage = (): Role => {
  const stored = localStorage.getItem("userRole");
  const roles: Role[] = ["super-admin", "admin", "qa", "agent", "billing", "other"];
  return roles.includes(stored as Role) ? (stored as Role) : "super-admin";
};

export const routes = [
  {
    path: "/",
    element: <UserClientSelector />,
  },
  {
    path: "/super-admin",
    element: <SuperAdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard userRole={getUserRoleFromStorage()} />,
      },
      {
        path: "dashboard",
        element: <Dashboard userRole={getUserRoleFromStorage()} />,
      },
      { path: "lead-tracking", element: <LeadTracking /> },
      { path: "verification-workflow", element: <VerificationWorkflow /> },
      { path: "document-management", element: <DocumentManagement /> },
      { path: "communications", element: <Communications /> },
      { path: "calendar-reminders", element: <CalendarReminders /> },

      // Forms submenus routes
      { path: "forms/form-builder", element: <FormBuilder /> },
      { path: "forms/active", element: <ActiveForms /> },
      { path: "forms/inactive", element: <InactiveForms /> },

      { path: "users", element: <Users /> },
      { path: "client-portal", element: <ClientPortal /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "reports", element: <Reports /> },
      { path: "billing", element: <Billing /> },
      { path: "integrations", element: <Integrations /> },
      { path: "ai-automation", element: <AIIntegration /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
