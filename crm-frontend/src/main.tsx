import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes/routes'
import './index.css' // Make sure this file exists or create one if needed

// Defines the routing logic using React Router v6+
function AppRoutes() {
  return useRoutes(routes)
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
