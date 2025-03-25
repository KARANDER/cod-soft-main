import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" text-black p-8">
      <div className="container mx-auto flex justify-between items-start">
        {/* Left Side */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Links</h3>
          <Link to="/" className="block hover:underline">Home</Link>
          <Link to="/browse-jobs" className="block hover:underline">Browse Jobs</Link>
          <Link to="/about-us" className="block hover:underline">About Us</Link>
        </div>

        {/* Center */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Job Sections</h3>
          <p>Web Development</p>
          <p>App Development</p>
          <p>UI/UX</p>
        </div>

        {/* Right Side */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p>Email: jobbrowse@gmail.com</p>
          <p>Contact No: 90909099090</p>
          <p>Address: xyzz</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
