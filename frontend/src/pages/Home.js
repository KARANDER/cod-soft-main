import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftImage1 from '../img/person1.jpeg';
import leftImage2 from '../img/person2.jpeg';
import leftImage3 from '../img/person3.jpeg';
import rightImage1 from '../img/person1.jpeg';
import rightImage2 from '../img/person2.jpeg';
import rightImage3 from '../img/person3.jpeg';
import companyimg from '../img/companyimg.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-[#ffffff]  text-black flex flex-col items-center justify-center h-screen relative">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-16">
        <img src={leftImage1} alt="Left 1" className="w-11 h-11 rounded-full ml-48" />
        <img src={leftImage2} alt="Left 2" className="w-20 h-20 rounded-full mr-11" />
        <img src={leftImage3} alt="Left 3" className="w-14 h-14 rounded-full ml-44" />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-16">
        <img src={rightImage1} alt="Right 1" className="w-11 h-11 rounded-full mr-48" />
        <img src={rightImage2} alt="Right 2" className="w-20 h-20 rounded-full ml-11" />
        <img src={rightImage3} alt="Right 3" className="w-14 h-14 rounded-full mr-44" />
      </div>
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold mb-4">Find & Hire Experts for any Job</h1>
        <p className="text-xl mb-6">Jobs & Job search. Find jobs in global. Executive jobs & work.</p>
       
          <div className="flex space-x-4 justify-center">
            <button 
              onClick={() => handleNavigate('/login')}
              className="bg-[#3edf63] text-white py-2 px-6 rounded transition duration-300 hover:bg-[#2df16f]"
            >
              Find a Job
            </button>
            <button 
              onClick={() => handleNavigate('/login')}
              className="bg-[#3edf63] text-white py-2 px-6 rounded transition duration-300 hover:bg-[#2df16f]"
            >
              Hire for a Job
            </button>
          </div>

          
       
      </div>

      <div className="flex  justify-center items-center absolute top-3/4">
            <img src={companyimg}  className="h-36" />
                        
      </div>
    </div>

    
  );
};

export default Home;
