import React from 'react';

// Import all widget components
import GeneralSummary from '../components/widgets/GeneralSummary';
import RecentActivity from '../components/widgets/RecentActivity';
import SystemStatus from '../components/widgets/SystemStatus';
import ActiveCampaigns from '../components/widgets/ActiveCampaigns';
import OnlineUsers from '../components/widgets/OnlineUsers';

import LeadsReceivedToday from '../components/widgets/LeadsReceivedToday';
import PendingTasks from '../components/widgets/PendingTasks';
import QuickCalendar from '../components/widgets/QuickCalendar';
import RecentCommunication from '../components/widgets/RecentCommunication';

import LeadsToVerify from '../components/widgets/LeadsToVerify';
import ReportedErrors from '../components/widgets/ReportedErrors';
import QualityStats from '../components/widgets/QualityStats';
import LatestReviews from '../components/widgets/LatestReviews';
import TimeIndicators from '../components/widgets/TimeIndicators';

import MyTasks from '../components/widgets/MyTasks';
import BillingSummary from '../components/widgets/BillingSummary';
import BillingReports from '../components/widgets/BillingReports';

export type WidgetConfig = {
  id: string;
  title: string;
  component: React.FC;
};

export type Role =
  | 'super-admin'
  | 'admin'
  | 'qa'
  | 'agent'
  | 'billing'
  | 'other';

export const widgetsByRole: Record<Role, WidgetConfig[]> = {
  'super-admin': [
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
    { id: 'recent-activity', title: 'Recent Activity', component: RecentActivity },
    { id: 'system-status', title: 'System Status', component: SystemStatus },
    { id: 'active-campaigns', title: 'Active Campaigns', component: ActiveCampaigns },
    { id: 'online-users', title: 'Online Users', component: OnlineUsers },

    { id: 'leads-received-today', title: 'Leads Received Today', component: LeadsReceivedToday },
    { id: 'pending-tasks', title: 'Pending Tasks', component: PendingTasks },
    { id: 'quick-calendar', title: 'Quick Calendar', component: QuickCalendar },
    { id: 'recent-communication', title: 'Recent Communication', component: RecentCommunication },

    { id: 'leads-to-verify', title: 'Leads to Verify', component: LeadsToVerify },
    { id: 'reported-errors', title: 'Reported Errors', component: ReportedErrors },
    { id: 'quality-stats', title: 'Quality Stats', component: QualityStats },
    { id: 'latest-reviews', title: 'Latest Reviews', component: LatestReviews },
    { id: 'time-indicators', title: 'Time Indicators', component: TimeIndicators },

    { id: 'my-tasks', title: 'My Tasks', component: MyTasks },

    { id: 'billing-summary', title: 'Billing Summary', component: BillingSummary },
    { id: 'billing-reports', title: 'Billing Reports', component: BillingReports },
  ],
  'admin': [
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
    { id: 'recent-activity', title: 'Recent Activity', component: RecentActivity },
    { id: 'leads-received-today', title: 'Leads Received Today', component: LeadsReceivedToday },
    { id: 'pending-tasks', title: 'Pending Tasks', component: PendingTasks },
    { id: 'quick-calendar', title: 'Quick Calendar', component: QuickCalendar },
    { id: 'recent-communication', title: 'Recent Communication', component: RecentCommunication },
    { id: 'system-status', title: 'System Status', component: SystemStatus },
  ],
  'qa': [
    { id: 'leads-to-verify', title: 'Leads to Verify', component: LeadsToVerify },
    { id: 'reported-errors', title: 'Reported Errors', component: ReportedErrors },
    { id: 'quality-stats', title: 'Quality Stats', component: QualityStats },
    { id: 'latest-reviews', title: 'Latest Reviews', component: LatestReviews },
    { id: 'time-indicators', title: 'Time Indicators', component: TimeIndicators },
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
  ],
  'agent': [
    { id: 'my-tasks', title: 'My Tasks', component: MyTasks },
    { id: 'pending-tasks', title: 'Pending Tasks', component: PendingTasks },
    { id: 'quick-calendar', title: 'Quick Calendar', component: QuickCalendar },
    { id: 'recent-communication', title: 'Recent Communication', component: RecentCommunication },
  ],
  'billing': [
    { id: 'billing-summary', title: 'Billing Summary', component: BillingSummary },
    { id: 'billing-reports', title: 'Billing Reports', component: BillingReports },
  ],
  'other': [
    // You can add default or limited widgets here for unknown/other roles
    { id: 'general-summary', title: 'General Summary', component: GeneralSummary },
  ],
};
