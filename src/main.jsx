import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/login';
import GuardiansInstructionsPage from './pages/GuardiansPage/GuardiansInstructionsPage.jsx';
import CaretakersPage from './pages/CaretakersPage/CaretakersPage.jsx'; // Import the new page

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/guardians',
    element: <GuardiansInstructionsPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/caretakers',
    element: <CaretakersPage />, // Add the new route
    errorElement: <div>Custom 404 Not Found</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);