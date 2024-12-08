import './App.scss';
import { RouterProvider } from 'react-router-dom';
import React from 'react';


import router from './router';

function App() {

  return (
    <div className="App">
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
