import { createBrowserRouter } from 'react-router-dom';
import React from 'react';


import Booking from './views/Booking';
import Confirmation from './views/Confirmation';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Booking />,
    },
    {
      path: '/confirmation',
      element: <Confirmation />,
    }
]);

export default router;