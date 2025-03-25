// components/candidate/ApplyJobModal.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyForJob } from '../../Services/Operations/Candidate'; // Adjust the import path as needed

const ApplyJobModal = ({ job, onClose }) => {
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (resume) {
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('coverLetter', coverLetter);
            dispatch(applyForJob(job._id, formData));
            onClose();
        } else {
            alert('Please upload a resume');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
                <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Cover Letter</label>
                        <textarea 
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Resume</label>
                        <input 
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            accept=".pdf,.doc,.docx"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="mr-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyJobModal;
