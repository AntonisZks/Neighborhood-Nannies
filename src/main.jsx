import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuardiansInstructionsPage from './pages/GuardiansPage/GuardiansInstructionsPage';
import CaretakersPage from './pages/CaretakersPage/CaretakersPage';
import Contacts from './pages/Contacts/Contacts';
import HomePage from './pages/HomePage/HomePage'; // Ensure HomePage is correctly imported

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/guardians',
    element: <GuardiansInstructionsPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/caretakers',
    element: <CaretakersPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/contacts',
    element: <Contacts />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);