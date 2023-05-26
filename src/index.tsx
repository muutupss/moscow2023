import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import ShortReportPage from './routes/ShortReportPage';
import CabinetPage from './routes/CabinetPage';
import AdminPage from './routes/AdminPage';

import ErrorPage from './error-page';
import 'antd/dist/reset.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/shortreport',
    element: <ShortReportPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cabinet',
    element: <CabinetPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
