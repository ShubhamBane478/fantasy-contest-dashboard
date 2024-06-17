import React, { useState, useEffect } from 'react';
import ContestList from '../components/ContentList'; // Adjust import path as needed

const Dashboard = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const storedContests = JSON.parse(localStorage.getItem('contests')) || [];
    setContests(storedContests);
  }, []);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contests Dashboard</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Welcome to the contests dashboard. Here are the contests you've added:
        </p>
        <div className="mt-8">
          <ContestList contests={contests} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
