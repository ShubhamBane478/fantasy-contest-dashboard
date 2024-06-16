import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContestCard from './ContestCard';

const ContestList = ({ contests, onDelete }) => {
  const location = useLocation();

  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-8">
          {location.pathname === '/' ? 'Upcoming Contests' : 'List of All Contests'}
        </h2>
        {contests && contests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {contests.map((contest, index) => (
              <ContestCard key={index} contest={contest} onDelete={onDelete} />
            ))}
          </div>
        ) : (
          <h5 className="font-bold mb-4 text-black">Currently No contests available</h5>
        )}
        {location.pathname === '/' && (
          <Link to="/add-contest" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200">
            Add New Contest
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContestList;
