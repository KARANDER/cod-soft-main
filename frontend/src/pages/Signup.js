import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../Slices/authSlice';
import { useDispatch } from "react-redux";
import { signUp } from '../Services/Operations/authApi';

const SignUp = () => {
  const [role, setLocalRole] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!role) {
      toast.error('Please select a role');
      return;
    }

    if (!name || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(signUp(name, email, password, role, navigate));
    dispatch(setSignupData(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mx-2 rounded-full ${role === 'employer' ? 'bg-green-600 text-white' : 'bg-white text-green-600'}`}
            onClick={() => setLocalRole('employer')}
          >
            Employer
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${role === 'candidate' ? 'bg-green-600 text-white' : 'bg-white text-green-600'}`}
            onClick={() => setLocalRole('candidate')}
          >
            Candidate
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
