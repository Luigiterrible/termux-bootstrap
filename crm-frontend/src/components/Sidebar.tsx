import React from 'react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Lead Tracking', path: '/lead-tracking' },
  { name: 'Verification Workflow', path: '/verification-workflow' },
  { name: 'Document Management', path: '/document-management' },
  { name: 'Communications', path: '/communications' },
  { name: 'Calendar & Reminders', path: '/calendar-reminders' },
  { name: 'Forms', path: '/forms' },
  { name: 'Users', path: '/users' },
  { name: 'Client Portal', path: '/client-portal' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Reports', path: '/reports' },
  { name: 'Billing', path: '/billing' },
  { name: 'Integrations', path: '/integrations' },
  { name: 'AI & Automation', path: '/ai' },
  { name: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Super Admin CRM</h2>
      <ul className="space-y-3 flex-1 overflow-auto">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-800 text-blue-400 font-semibold shadow-md'
                    : 'hover:bg-gray-800'
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <footer className="mt-auto text-gray-400 text-center text-sm">
        © 2025 Your Company
      </footer>
    </aside>
  )
}
