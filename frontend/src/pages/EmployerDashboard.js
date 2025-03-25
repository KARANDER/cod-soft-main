import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const EmployerDashboard = () => {
  return (
    <div>
      <h1 className="text-center justify-center flex">Employer Dashboard</h1>
      <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
