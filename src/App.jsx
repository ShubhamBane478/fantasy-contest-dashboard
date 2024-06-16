// Layout.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

import './App.css'; 
const App = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <Sidebar />
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
