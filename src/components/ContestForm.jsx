import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Calendar, Upload } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const ContestForm = ({ onSubmit }) => {
  const [contest, setContest] = useState({
    date: null,
    startTime: '10:00',
    name: '',
    fees: 'Free',
    price: '',
    banner: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContest(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setContest(prevState => ({ ...prevState, banner: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (date) => {
    setContest(prevState => ({ ...prevState, date }));
  };

  const handleTimeChange = (time) => {
    setContest(prevState => ({ ...prevState, startTime: time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!contest.date || !contest.startTime || !contest.name || (contest.fees === 'Paid' && !contest.price)) {
      alert('Please fill in all required fields.');
      return;
    }

    // Retrieve the existing contests and the last contest ID from local storage
    const existingContests = JSON.parse(localStorage.getItem('contests')) || [];
    let lastId = JSON.parse(localStorage.getItem('lastContestId')) || 0;

    // Increment the ID for the new contest
    const newId = lastId + 1;

    // Create a new contest with the incremented ID
    const newContest = { ...contest, id: newId };

    // Save the new contest and the new last ID to local storage
    existingContests.push(newContest);
    localStorage.setItem('contests', JSON.stringify(existingContests));
    localStorage.setItem('lastContestId', JSON.stringify(newId));

    // Reset form fields
    setContest({
      date: null,
      startTime: '10:00',
      name: '',
      fees: 'Free',
      price: '',
      banner: null
    });

    // Show success message using sonner
    toast.success('New Contest Created.');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl sm:mt-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
            Contest Name
          </label>
          <div className="mt-2.5 relative">
            <input
              type="text"
              name="name"
              id="name"
              value={contest.name}
              onChange={handleChange}
              required
              placeholder="Contest Name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-semibold leading-6 text-gray-900">
            Contest Date
          </label>
          <div className="mt-2.5 relative">
            <DatePicker
              selected={contest.date}
              onChange={handleDateChange}
              icon={<Calendar />}
              dateFormat="dd/MM/yyyy"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
              placeholderText="Select date"
            />
          </div>
        </div>
        <div>
          <label htmlFor="startTime" className="block text-sm font-semibold leading-6 text-gray-900">
            Start Time
          </label>
          <div className="mt-2.5 relative">
            <TimePicker
              onChange={handleTimeChange}
              value={contest.startTime}
              disableClock={true}
              clockAriaLabel="Toggle clock"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="fees" className="block text-sm font-semibold leading-6 text-gray-900">
            Contest Fees
          </label>
          <div className="mt-2.5">
            <select
              name="fees"
              id="fees"
              value={contest.fees}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
        {contest.fees === 'Paid' && (
          <div className="sm:col-span-2">
            <label htmlFor="price" className="block text-sm font-semibold leading-6 text-gray-900">
              Contest Price (INR)
            </label>
            <div className="mt-2.5 relative">
              <span className="absolute left-3 top-2 h-5 w-5 text-gray-400">₹</span>
              <input
                type="number"
                name="price"
                id="price"
                value={contest.price}
                onChange={handleChange}
                required
                placeholder="Enter price in INR"
                className="block w-full pl-8 rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="banner" className="block text-sm font-semibold leading-6 text-gray-900">
            Contest Banner
          </label>
          <div className="mt-2.5">
            <label htmlFor="banner" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
              {contest.banner ? (
                <img src={contest.banner} alt="Contest Banner" className="object-cover w-full h-full rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">Upload a banner (Max size 300x200px). Images will be stored locally.</p>
                </div>
              )}
              <input id="banner" type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
        <div className="sm:col-span-2 flex justify-center space-x-4">
          <button
            type="submit"
            className="rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add New Contest
          </button>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default ContestForm;
