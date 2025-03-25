// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getalljobByuser } from '../../Services/Operations/Candidate'; // Import the function to fetch applied jobs
// import ApplyJobModal from './ApplyJobModal'; // Adjust the import path as needed

// const Applied = () => {
//     const dispatch = useDispatch();
//     const jobs = useSelector(state => state.profile.jobs); // Assuming the jobs are stored in the profile slice of the Redux store
//     const [selectedJob, setSelectedJob] = useState(null);

//     useEffect(() => {
//         // Fetch applied jobs when the component mounts
//         dispatch(getalljobByuser());
//     }, [dispatch]);

//     const handleApply = (job) => {
//         setSelectedJob(job);
//     };

//     return (
//         <div className="container mx-auto py-8">
//             <h1 className="text-3xl font-bold mb-4">Applied Jobs</h1>
//             {jobs.length > 0 ? (
//                 jobs.map(job => (
//                     <div key={job._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
//                         <h2 className="text-xl font-bold mb-2">{job.title}</h2>
//                         <p className="text-gray-700 mb-2">{job.description}</p>
//                         <p className="text-gray-600 mb-2">Company: {job.company}</p>
//                         <p className="text-gray-600 mb-2">Location: {job.location}</p>
//                         <p className="text-gray-600 mb-2">Salary: {job.salary}</p>
//                         <button 
//                             onClick={() => handleApply(job)} 
//                             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//                         >
//                             Apply For Job
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No applied jobs found</p>
//             )}
//             {selectedJob && <ApplyJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
//         </div>
//     );
// }

// export default Applied;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getalljobByuser } from '../../Services/Operations/Candidate'; // Adjust the import path as needed
import ApplyJobModal from './ApplyJobModal'; // Adjust the import path as needed
import { FaSearch, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBriefcase } from 'react-icons/fa';

const Applied = () => {
    const dispatch = useDispatch();
    const allJobs = useSelector(state => state.profile.jobs) || []; // Assuming the jobs are stored in the profile slice of the Redux store
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    

    useEffect(() => {
        // Fetch applied jobs when the component mounts
        dispatch(getalljobByuser());
    }, [dispatch]);
    
    useEffect(() => {
        // Filter jobs based on search query
        const filtered = allJobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );  
        setFilteredJobs(filtered);
    }, [allJobs, searchQuery]);
    
    console.log(allJobs,"alljobs");
    const handleApply = (job) => {
        setSelectedJob(job);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Applied Jobs</h1>
            <div className="relative mb-8 w-full max-w-md mx-auto">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <FaSearch className="absolute top-3 right-3 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FaBriefcase className="mr-2 text-green-500" />
                                {job.title}
                            </h2>
                            <p className="text-green-700 mb-4">{job.description}</p>
                            <div className="mb-2 flex items-center">
                                <FaBuilding className="text-gray-500 mr-2" />
                                <p className="text-gray-700">Company: {job.company}</p>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                                <p className="text-gray-700">Location: {job.location}</p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <FaDollarSign className="text-gray-500 mr-2" />
                                <p className="text-gray-700">Salary: {job.salary}</p>
                            </div>
                            <button 
                                onClick={() => handleApply(job)} 
                                className="mt-4 bg-[#3edf63] text-black py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                            >
                                Apply For Job
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-full">No applied jobs found</p>
                )}
            </div>
            {selectedJob && <ApplyJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
};

export default Applied;
