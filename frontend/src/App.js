import React, {useState} from 'react';
import Navebar from './components/Navebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import JobPost from './components/Employer/JobPost';
import Replication from './components/Employer/Replication';
import AppliedJob from './components/Candidate/AppliedJob'
import ViewJobs from './components/Employer/ViewJobs'
import HowItWork from './pages/HowItWork';


function App() {

  return (
      <div className="App">
        <Navebar/>
      
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />}>
            <Route path="JobPost" element={<JobPost />} />
            <Route path="Replication" element={<Replication />} />
            <Route path="Viewjobs" element={<ViewJobs />} /> 
          </Route>
          <Route path="/candidate-dashboard" element={<CandidateDashboard />}>
            <Route path="AppliedJob" element={<AppliedJob />} />    
          </Route>
        </Routes>
        {/* <HowItWork/> */}
        <Footer/>
      </div>
    
  );
}

export default App;
