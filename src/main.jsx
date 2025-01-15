// Import the required modules from react and react-dom
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import the pages of the application
import HomePage from './pages/HomePage/HomePage.jsx';
<<<<<<< HEAD
import LoginPage from './pages/login';
import AnouncementPage from './pages/AnouncementPage/AnouncemntPage.jsx';
=======
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import ParentProfile from './pages/ParentProfile/ParentProfile.jsx';
>>>>>>> 661f56c30c3f2d10dfb3fd130107049fa5d86060

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
    path: '/payment',
    element: <PaymentPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/parent-profile',
    element: <ParentProfile />,
    errorElement: <div>Custom 404 Not Found</div>,
  },
  {
    path: '/anouncement',
    element: <AnouncementPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  }
]);

// Create the main root element of the application and render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
