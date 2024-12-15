// Import the required modules from react and react-dom
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import the pages of the application
import HomePage from './pages/home';
import LoginPage from './pages/login';

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
    path: '/login',
    element: <LoginPage />,
    errorElement: <div>Custom 404 Not Found</div>,
  }
]);

// Create the main root element of the application and render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
