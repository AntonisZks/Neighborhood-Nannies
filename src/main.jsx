import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuardiansInstructionsPage from './pages/GuardiansPage/GuardiansInstructionsPage';
import CaretakersPage from './pages/CaretakersPage/CaretakersPage';
import Contacts from './pages/Contacts/Contacts';
import HomePage from './pages/HomePage/HomePage'; // Ensure HomePage is correctly imported
import AnouncementPage from './pages/AnouncementPage/AnouncemntPage.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import ParentDashboard from './pages/ParentDashboard/ParentDashboard.jsx';
import Chat from './pages/chat/chat.jsx'; // Import the Chat component
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import ParentLoginPage from './pages/LoginPages/ParentLoginPage.jsx';
import NannyLoginPage from './pages/LoginPages/NannyLoginPage.jsx';

// Import the global styles of the application
import './index.css';

// Create a browser router with the routes of the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/parent-login',
    element: <ParentLoginPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/nanny-login',
    element: <NannyLoginPage />,
    errorElement: <div>Custom 404 Not</div>,
  },
  {
    path: '/guardians',
    element: <GuardiansInstructionsPage />,
  },
  {
    path: '/anouncement',
    element: <AnouncementPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/p_dashboard',
    element: <ParentDashboard />,
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
  {
    path: '/chat',
    element: <Chat />, // Add the Chat route
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);