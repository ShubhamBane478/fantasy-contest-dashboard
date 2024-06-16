import React from 'react';
import { Calendar, Clock, Tag, Trash2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const ContestCard = ({ contest, onDelete }) => {
  // Function to format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Function to format time as HH:MM AM/PM
  const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', options);
  };

  // Function to handle join button click
  const handleJoin = () => {
    toast.success(`Joined the ${contest.name} Contest`);
  };

  return (
    <div className="border text-card-foreground bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={contest.banner || 'https://placehold.jp/eaeaea/eaeaea/300x300.png'}
        alt={contest.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-left">{contest.name}</h2>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          {formatDate(contest.date)}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock className="w-4 h-4" />
          {formatTime(contest.startTime)}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Tag className="w-4 h-4" />
          {contest.fees === 'Free' ? 'Free' : `Paid - ₹${contest.price}`}
        </div>
        <div className="flex justify-between items-center mt-4">
          
          <button
            aria-label={`Join ${contest.name} contest`}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
            onClick={handleJoin}
          >
            Join
          </button>
          <Trash2
            onClick={() => onDelete(contest.id)}
            className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default ContestCard;
