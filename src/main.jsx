import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuardiansInstructionsPage from './pages/GuardiansPage/GuardiansInstructionsPage';
import CaretakersPage from './pages/CaretakersPage/CaretakersPage';
import Contacts from './pages/Contacts/Contacts';
import HomePage from './pages/HomePage/HomePage'; // Ensure HomePage is correctly imported

<<<<<<< HEAD
=======
// Import the pages of the application
import HomePage from './pages/HomePage/HomePage.jsx';
import AnouncementPage from './pages/AnouncementPage/AnouncemntPage.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import ParentProfile from './pages/ParentProfile/ParentProfile.jsx';

// Import the global styles of the application
import './index.css';


// Create a browser router with the routes of the application
>>>>>>> 4e535ca8d2912cea6a201d4e2168887fbf025740
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
<<<<<<< HEAD
    path: '/guardians',
    element: <GuardiansInstructionsPage />,
=======
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
    path: '/parent-profile',
    element: <ParentProfile />,
>>>>>>> 4e535ca8d2912cea6a201d4e2168887fbf025740
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