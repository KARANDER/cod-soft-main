import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { employerapi } from '../../Services/Operations/Employerapi';
import { useNavigate } from 'react-router-dom';
import { setJobPost } from "../../Slices/profileSlice";

const JobPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, company, location, salary } = formData;

        dispatch(employerapi(title, description, company, location, salary, navigate));
        dispatch(setJobPost(formData));
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-md text-black">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black mb-2" htmlFor="title">Title</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2" htmlFor="description">Description</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2" htmlFor="company">Company</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2" htmlFor="location">Location</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2" htmlFor="salary">Salary</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="number"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button
                        className="w-full px-4 py-2 rounded-lg bg-[#3edf63] text-black hover:bg-green-500 focus:outline-none focus:bg-green-500"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobPost;
