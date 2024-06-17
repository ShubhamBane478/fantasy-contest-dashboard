import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContestCard from './ContestCard';

const useContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const storedContests = JSON.parse(localStorage.getItem('contests')) || [];
    setContests(storedContests);
  }, []);

  return contests;
};

const ContestList = () => {
  const contests = useContests();
  const location = useLocation();

  const title = useMemo(() => 
    location.pathname === '/' ? 'Upcoming Contests' : 'List of All Contests'
  , [location.pathname]);

  return (
    <div className="flex justify-center items-start bg-white min-h-screen ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-8">{title}</h2>
        {contests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {contests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <h5 className="font-bold mb-8 text-black">Currently No Contests Available</h5>
        )}
        <Link
          to="/add-contest"
          className="block mx-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 mt-6"
          style={{ maxWidth: '200px' }}
        >
          Add New Contest
        </Link>
      </div>
    </div>
  );
};

export default ContestList;
