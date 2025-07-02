import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Type for widget state
type WidgetState = {
  [key: string]: boolean
}

// Corrected: ID is now explicitly string
type WidgetOption = {
  id: string
  label: string
}

const data = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4000 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 7000 },
]

const WIDGETS: WidgetOption[] = [
  { id: 'kpi', label: 'KPI Summary' },
  { id: 'revenueChart', label: 'Monthly Revenue Chart' },
]

export default function Dashboard() {
  const [showWidgetsPanel, setShowWidgetsPanel] = useState(false)

  const [activeWidgets, setActiveWidgets] = useState<WidgetState>(() => {
    const saved = localStorage.getItem('dashboardWidgets')
    return saved
      ? JSON.parse(saved)
      : {
          kpi: true,
          revenueChart: true,
        }
  })

  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(activeWidgets))
  }, [activeWidgets])

  function toggleWidget(id: string) {
    setActiveWidgets((prev: WidgetState) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto font-sans relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Widgets Button with black border and gear icon */}
        <button
          onClick={() => setShowWidgetsPanel((v) => !v)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none border border-black flex items-center space-x-2"
          aria-expanded={showWidgetsPanel}
          aria-controls="widgets-panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.4 15a1.65 1.65 0 01.33 1.82l-1.28 2.22a1.65 1.65 0 01-2.13.7l-2.49-1a1.65 1.65 0 00-1.52 0l-2.49 1a1.65 1.65 0 01-2.13-.7l-1.28-2.22a1.65 1.65 0 01.33-1.82l2.06-1.78a1.65 1.65 0 000-2.7L5.18 9.4a1.65 1.65 0 01-.33-1.82l1.28-2.22a1.65 1.65 0 012.13-.7l2.49 1a1.65 1.65 0 001.52 0l2.49-1a1.65 1.65 0 012.13.7l1.28 2.22a1.65 1.65 0 01-.33 1.82l-2.06 1.78a1.65 1.65 0 000 2.7l2.06 1.78z"
            />
          </svg>
          <span>Widgets</span>
        </button>
      </div>

      {/* Widget Selection Panel */}
      {showWidgetsPanel && (
        <div
          id="widgets-panel"
          className="absolute top-16 right-6 bg-white border border-gray-300 rounded shadow-lg p-4 w-64 z-50"
        >
          <h2 className="font-semibold mb-3">Select Widgets</h2>
          <form>
            {WIDGETS.map(({ id, label }) => (
              <label
                key={id}
                className="flex items-center space-x-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!activeWidgets[id]}
                  onChange={() => toggleWidget(id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{label}</span>
              </label>
            ))}
          </form>
        </div>
      )}

      {/* KPI Cards */}
      {activeWidgets.kpi && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">Leads</h2>
            <p className="text-blue-700 text-2xl font-bold">124</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-green-800">Open Cases</h2>
            <p className="text-green-700 text-2xl font-bold">37</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-yellow-800">Pending Tasks</h2>
            <p className="text-yellow-700 text-2xl font-bold">9</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-purple-800">Conversion Rate</h2>
            <p className="text-purple-700 text-2xl font-bold">18%</p>
          </div>
        </div>
      )}

      {/* Revenue Bar Chart */}
      {activeWidgets.revenueChart && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      )}
    </div>
  )
}
