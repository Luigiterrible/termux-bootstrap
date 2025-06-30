// src/pages/Dashboard.tsx
import React from 'react'

export default function Dashboard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Bienvenido al panel principal del Super Admin CRM.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Leads</h2>
          <p className="text-blue-700 text-2xl">124</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Casos Abiertos</h2>
          <p className="text-green-700 text-2xl">37</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-yellow-800">Tareas Pendientes</h2>
          <p className="text-yellow-700 text-2xl">9</p>
        </div>
      </div>
    </div>
  )
}
