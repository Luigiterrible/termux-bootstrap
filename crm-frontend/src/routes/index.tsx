// src/routes/index.tsx

import React from 'react'
import Dashboard from "../pages/super-admin/Dashboard"
import LeadTracking from "../pages/super-admin/LeadTracking"
import VerificationWorkflow from "../pages/super-admin/VerificationWorkflow"
import DocumentManagement from "../pages/super-admin/DocumentManagement"
import Communications from "../pages/super-admin/Communications"
import CalendarReminders from "../pages/super-admin/CalendarReminders"
import Forms from "../pages/super-admin/Forms"
import Users from "../pages/super-admin/Users"
import ClientPortal from "../pages/super-admin/ClientPortal"
import Campaigns from "../pages/super-admin/Campaigns"
import Reports from "../pages/super-admin/Reports"
import Billing from "../pages/super-admin/Billing"
import Integrations from "../pages/super-admin/Integrations"
import AI from "../pages/super-admin/AI"
import Settings from "../pages/super-admin/Settings"

export const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/lead-tracking', element: <LeadTracking /> },
  { path: '/verification-workflow', element: <VerificationWorkflow /> },
  { path: '/document-management', element: <DocumentManagement /> },
  { path: '/communications', element: <Communications /> },
  { path: '/calendar-reminders', element: <CalendarReminders /> },
  { path: '/forms', element: <Forms /> },
  { path: '/users', element: <Users /> },
  { path: '/client-portal', element: <ClientPortal /> },
  { path: '/campaigns', element: <Campaigns /> },
  { path: '/reports', element: <Reports /> },
  { path: '/billing', element: <Billing /> },
  { path: '/integrations', element: <Integrations /> },
  { path: '/ai', element: <AI /> },
  { path: '/settings', element: <Settings /> },
]
