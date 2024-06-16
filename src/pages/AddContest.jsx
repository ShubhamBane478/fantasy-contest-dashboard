import React from 'react';
import { Toaster, toast } from 'sonner';
import ContestForm from '../components/ContestForm';

export default function AddContest() {
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
    <div className="isolate bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add Contest</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Fill in the details to add a new contest.
        </p>
      </div>
      <ContestForm />
      <div className="flex justify-center mt-4">
        <Toaster/>
        <button
          type="button"
          onClick={handleCustomToast}
          className="rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Show Custom Toast
        </button>
      </div>
    </div>
  );
}
