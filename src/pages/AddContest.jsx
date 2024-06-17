import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import ContestForm from '../components/ContestForm';
import 'react-datepicker/dist/react-datepicker.css';

const AddContest = () => {
  const [contest, setContest] = useState({
    date: null,
    startTime: '',
    name: '',
    fees: 'Free',
    price: '',
    banner: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContest(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setContest(prevState => ({ ...prevState, date }));
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    const [time, modifier] = value.split(' ');
    const [hours, minutes] = time.split(':');
    let formattedTime = value;

    if (modifier === 'PM' && hours !== '12') {
      formattedTime = `${parseInt(hours, 10) + 12}:${minutes}`;
    } else if (modifier === 'AM' && hours === '12') {
      formattedTime = `00:${minutes}`;
    }

    setContest(prevState => ({ ...prevState, startTime: formattedTime }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!contest.date || !contest.startTime || !contest.name || (contest.fees === 'Paid' && !contest.price)) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save contest to localStorage
    const existingContests = JSON.parse(localStorage.getItem('contests')) || [];
    existingContests.push(contest);
    localStorage.setItem('contests', JSON.stringify(existingContests));

    // Reset form fields
    setContest({
      date: null,
      startTime: '',
      name: '',
      fees: 'Free',
      price: '',
      banner: null
    });

    // Show success message using sonner
    toast.success('New Contest Created.');
  };

  const handleCustomToast = () => {
    toast.success('New Contest Created.', {
      style: {
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px',
      },
    });
  };

  return (
    <div className="flex justify-center items-center bg-white py-14">
      <Toaster />
      <div className="container bg-white  mx-auto max-w-2xl px-8 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">Add New Contest</h2>
        <ContestForm
          contest={contest}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddContest;
