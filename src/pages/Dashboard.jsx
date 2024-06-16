import React, { useState, useEffect } from 'react';
import ContestList from './ListOfContest'; // Adjust import path as needed

const Dashboard = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const storedContests = JSON.parse(localStorage.getItem('contests')) || [];
    setContests(storedContests);
  }, []);

  return (
    <div className="bg-white py-10 ">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contests Dashboard</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Welcome to the contests dashboard. Here are the contests you've added:
        </p>
      </div>
      <div className="mx-auto  ">
        <ContestList contests={contests} />
      </div>
    </div>
  );
};

export default Dashboard;
