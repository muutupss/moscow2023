import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import ShortReportPage from './routes/ShortReportPage';
import CabinetPage from './routes/CabinetPage';
import AdminPage from './routes/AdminPage';

import { StoreContext } from './hooks/use-store';
import { stores } from './stores/stores';
import { configure } from 'mobx';

import ErrorPage from './error-page';
import 'antd/dist/reset.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

configure({
  enforceActions: 'always',
});

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
  <StoreContext.Provider value={stores()}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
