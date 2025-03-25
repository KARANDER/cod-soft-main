import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Services/Operations/Employerapi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole } from '../Slices/profileSlice'; // Ensure to import setUserRole action

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage loading state while fetching user role
  const [loading, setLoading] = useState(false);

  const userRoleFromStore = useSelector((state) => state.profile.role);

  const userRole = userRoleFromStore || localStorage.getItem('userRole');

  useEffect(() => {
    if (userRole) {
      // Save user role to local storage when it changes
      console.log("Setting userRole in local storage:", userRole);
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Navigate to home after logout
  };

  const viewJobs = () => {
    navigate("Viewjobs"); // Ensure the path matches the route
  };

  const viewJobDetails = () => {
    navigate("AppliedJob"); // Navigate to the AppliedJob component for candidates
  };

  if (loading) {
    // Render loading state while fetching user role
    return <div>Loading...</div>;
  }

  console.log("Final userRole:", userRole);

  return (
    <div className="w-60 mt-2 sticky top-0 h-screen overflow-y-auto border-r-2">
      <div className="flex flex-col items-center">
        {userRole === 'employer' && (
          <>
            <button  className="bg-[#3edf63] p-3 rounded-md w-44" onClick={viewJobs}>Job Application</button>
            <button  className="bg-[#3edf63] p-3 rounded-md mt-4 w-44" onClick={() => navigate("JobPost")}>Create Job</button>
            <button  className="bg-[#3edf63] p-3 rounded-md mt-4 w-44" onClick={() => navigate("Replication")}>Replication</button>
          </>
        )}
        {userRole === 'candidate' && (
          <>
            <button className="bg-[#3edf63] p-3 rounded-md"onClick={viewJobDetails}>View Job Details</button>
          </>
        )}
        <button 
          onClick={handleLogout} 
          className="mt-4 bg-[#3edf63] text-black py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
