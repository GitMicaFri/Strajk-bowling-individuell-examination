import './App.scss';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './router';
import TestApiCall from './tests/TestApiCall';

function App() {

  return (
    <div className="App">
      <TestApiCall/>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
