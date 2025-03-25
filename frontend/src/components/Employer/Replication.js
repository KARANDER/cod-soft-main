import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobfetched, deleteJob } from '../../Services/Operations/Employerapi'; // Adjust path as needed

const Replication = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.profile.jobs);

    useEffect(() => {
        dispatch(jobfetched());
    }, [dispatch]);

    const handleDelete = (jobId) => {
        dispatch(deleteJob(jobId));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Job Posts</h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="job-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="mb-4">
                                <span className="font-bold">Company: </span>
                                <span>{job.company}</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold">Location: </span>
                                <span>{job.location}</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold">Salary: </span>
                                <span>${job.salary}</span>
                            </div>
                            <button 
                                onClick={() => handleDelete(job._id)} 
                                className="mt-4 bg-[#3edf63] text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No job posts found</p>
                )}
            </div>
        </div>
    );
}

export default Replication;
