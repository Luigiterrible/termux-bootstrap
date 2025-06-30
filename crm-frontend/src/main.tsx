import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import App from './App'
import { routes } from './routes'

function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <App />,
      children: routes,
    },
  ])
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
