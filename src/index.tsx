import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import ErrorPage from './error-page';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './routes/Registration';

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
    element: <Registration />,
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
