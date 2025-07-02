import React from 'react'
import SuperAdminLayout from './components/super-admin/SuperAdminLayout'

import Dashboard from './pages/super-admin/Dashboard'
import LeadTracking from './pages/super-admin/LeadTracking'
import VerificationWorkflow from './pages/super-admin/VerificationWorkflow'
import DocumentManagement from './pages/super-admin/DocumentManagement'
import Communications from './pages/super-admin/Communications'
import CalendarReminders from './pages/super-admin/CalendarReminders'
import Forms from './pages/super-admin/Forms'
import Users from './pages/super-admin/Users'
import ClientPortal from './pages/super-admin/ClientPortal'
import Campaigns from './pages/super-admin/Campaigns'
import Reports from './pages/super-admin/Reports'
import Billing from './pages/super-admin/Billing'
import Integrations from './pages/super-admin/Integrations'
import AIIntegration from './pages/super-admin/AIIntegration'
import Settings from './pages/super-admin/Settings'

export const routes = [
  {
    path: '/super-admin',
    element: <SuperAdminLayout><Dashboard /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/lead-tracking',
    element: <SuperAdminLayout><LeadTracking /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/verification-workflow',
    element: <SuperAdminLayout><VerificationWorkflow /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/document-management',
    element: <SuperAdminLayout><DocumentManagement /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/communications',
    element: <SuperAdminLayout><Communications /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/calendar-reminders',
    element: <SuperAdminLayout><CalendarReminders /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/forms',
    element: <SuperAdminLayout><Forms /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/users',
    element: <SuperAdminLayout><Users /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/client-portal',
    element: <SuperAdminLayout><ClientPortal /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/campaigns',
    element: <SuperAdminLayout><Campaigns /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/reports',
    element: <SuperAdminLayout><Reports /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/billing',
    element: <SuperAdminLayout><Billing /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/integrations',
    element: <SuperAdminLayout><Integrations /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/ai-automation',
    element: <SuperAdminLayout><AIIntegration /></SuperAdminLayout>,
  },
  {
    path: '/super-admin/settings',
    element: <SuperAdminLayout><Settings /></SuperAdminLayout>,
  },
]
