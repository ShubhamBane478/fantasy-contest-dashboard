import React, { useMemo } from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import { toast } from 'sonner';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

const formatTime = (timeString) => {
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', options);
};

const ContestCard = React.memo(({ contest }) => {
  const handleJoin = () => {
    toast.success(`Joined the ${contest.name} Contest`);
  };

  const formattedDate = useMemo(() => formatDate(contest.date), [contest.date]);
  const formattedTime = useMemo(() => formatTime(contest.startTime), [contest.startTime]);

  return (
    <div className="border text-card-foreground bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-left">{contest.name}</h2>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock className="w-4 h-4" />
          {formattedTime}
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
        </div>
      </div>
    </div>
  );
});

export default ContestCard;