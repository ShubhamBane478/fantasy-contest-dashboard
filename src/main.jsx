import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Dashboard from './pages/Dashboard';
import ListOfContest from './pages/ListOfContest';
import AddContest from './pages/AddContest';
import App from './App';

// Define routes directly with <Routes> and <Route> components
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contests" element={<ListOfContest />} />
        <Route path="/add-contest" element={<AddContest />} />
      </Route>
    </Routes>
  );
}

// Use createRoot correctly to render your application
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
