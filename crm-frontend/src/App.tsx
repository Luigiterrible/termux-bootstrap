// src/routes/routes.tsx
import React from 'react';
import UserClientSelector from '../pages/super-admin/UserClientSelector';
import SuperAdminLayout from '../components/super-admin/SuperAdminLayout';
import Dashboard from '../pages/super-admin/Dashboard';
// importa otros componentes de página si tienes

export const routes = [
  {
    path: '/',
    element: <UserClientSelector />,
  },
  {
    path: '/super-admin/*',
    element: <SuperAdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard userRole={localStorage.getItem('userRole') || 'super-admin'} />,
      },
      // aquí otras rutas hijas de super-admin, si tienes
    ],
  },
];
