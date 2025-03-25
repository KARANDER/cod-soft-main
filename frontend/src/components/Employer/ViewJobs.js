import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobApplicationsForEmployer } from '../../Services/Operations/Employerapi';
import { FaUser, FaBriefcase, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const ViewJobs = () => {

    const dispatch = useDispatch();
    const jobApplications = useSelector(state => state.profile.jobApplications) || [];

    useEffect(() => {
        dispatch(getJobApplicationsForEmployer());
    }, [dispatch]);

    console.log(jobApplications, "my personal job console");

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Job Applications</h1>
            {jobApplications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobApplications.map(application => (
                        <div key={application._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-2">
                                    <FaBriefcase className="mr-2 text-green-500" />
                                    {application.job.title}
                                </h2>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaUser className="text-gray-500 mr-2" />
                                <p className="text-gray-700">{application.candidate.name}</p>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaFileAlt className="text-gray-500 mr-2" />
                                <p className="text-gray-600">{application.coverLetter}</p>
                            </div>
                            <div className="mb-2 flex items-center">
                                <FaCalendarAlt className="text-gray-500 mr-2" />
                                <p className="text-gray-600">Date Applied: {new Date(application.dateApplied).toLocaleDateString()}</p>
                            </div>
                            <a 
                                href={application.resume} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-[#3edf63] text-black py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                View Resume
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No job applications found</p>
            )}
        </div>
    );
};

export default ViewJobs;
