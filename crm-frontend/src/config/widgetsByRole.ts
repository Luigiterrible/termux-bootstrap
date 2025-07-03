import React from 'react'

// Import your actual widget components
import GeneralSummary from '../components/widgets/GeneralSummary'
import RecentActivity from '../components/widgets/RecentActivity'
import SystemStatus from '../components/widgets/SystemStatus'
import ActiveCampaigns from '../components/widgets/ActiveCampaigns'
import OnlineUsers from '../components/widgets/OnlineUsers'

// Define user roles
export type Role = 'super-admin' | 'admin' | 'qa' | 'agent' | 'billing' | 'other'

// Widget configuration type
export type WidgetConfig = {
  id: string
  title: string
  component: React.FC
}

// Widget access by role
export const widgetsByRole: Record<Role, WidgetConfig[]> = {
  'super-admin': [
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
    { id: 'recent-activity', title: 'Recent Activity', component: RecentActivity },
    { id: 'system-status', title: 'System Status', component: SystemStatus },
    { id: 'active-campaigns', title: 'Active Campaigns', component: ActiveCampaigns },
    { id: 'online-users', title: 'Online Users', component: OnlineUsers },
  ],
  'admin': [
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
    { id: 'recent-activity', title: 'Recent Activity', component: RecentActivity },
    { id: 'active-campaigns', title: 'Active Campaigns', component: ActiveCampaigns },
    { id: 'system-status', title: 'System Status', component: SystemStatus },
  ],
  'qa': [
    { id: 'recent-activity', title: 'Recent Activity', component: RecentActivity },
    { id: 'system-status', title: 'System Status', component: SystemStatus },
  ],
  'agent': [
    { id: 'active-campaigns', title: 'Active Campaigns', component: ActiveCampaigns },
  ],
  'billing': [
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
    { id: 'online-users', title: 'Online Users', component: OnlineUsers },
  ],
  'other': [],
}
