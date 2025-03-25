import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { fetchFilteredJobs } from '../Services/Operations/jobActions'; // Import the action for fetching filtered jobs
import Sidebar from '../components/Sidebar';

const CandidateDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleSearch = (e) => {
    e.preventDefault();
    // Dispatch action to fetch filtered jobs based on searchQuery
    // dispatch(fetchFilteredJobs(searchQuery)); // Dispatch action with searchQuery
  };

  return (
    <div>
      <h1 className="text-center justify-center flex bg-[#3edf63]">Candidate Dashboard</h1>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <form onSubmit={handleSearch} className="my-4 mx-auto max-w-md">
            {/* <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            {/* <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            >
              Search
            </button> */}
          </form>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
