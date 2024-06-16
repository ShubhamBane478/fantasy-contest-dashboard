// ListOfContest.js
import React, { useState, useEffect } from 'react';
import ContestList from '../components/ContentList'; // Ensure correct path to ContestList component

const ListOfContest = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Fetch contests from localStorage on component mount
    const storedContests = JSON.parse(localStorage.getItem('contests')) || [];
    setContests(storedContests);
  }, []);

  return (
    <div className="bg-white px-6 py-6 lg:px-8">
      
      <div className="mx-auto mt-6 ">
        <ContestList contests={contests} />
      </div>
    </div>
  );
};

export default ListOfContest;
