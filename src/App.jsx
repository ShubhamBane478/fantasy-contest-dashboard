import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] mt-4 sm:mt-0">
      <Sidebar />
      <main className="flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default App;