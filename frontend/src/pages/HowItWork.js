import React from 'react';
import createaccount from '../img/createaccount.png';
import login from '../img/login.png';
import people from '../img/people.png';

const HowItWork = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 flex justify-center items-center">How It Works</h1>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center border-">
          <img
            src={createaccount}
            alt="Create Account"
            className="w-16 h-16 p-5 bg-cover bg-no-repeat rounded-full mb-4 mx-auto"
          />
          <h3 className="text-lg font-semibold">Create an Account</h3>
        </div>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="text-center">
          <img
            src={login}
            alt="Login"
            className="w-32 h-32 rounded-full mb-4 mx-auto"
          />
          <h3 className="text-lg font-semibold">Login</h3>
        </div>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="text-center">
          <img
            src={people}
            alt="Apply for Job"
            className="w-32 h-32 rounded-full mb-4 mx-auto"
          />
          <h3 className="text-lg font-semibold">Apply for Job & Hire</h3>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
