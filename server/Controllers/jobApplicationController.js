// controllers/jobApplicationController.js
const JobApplication = require('../Models/Application');
const Job = require('../Models/Job');
const User = require('../Models/User');
const sendEmail = require('../utils/emailService');

exports.applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { coverLetter } = req.body;
    const jobId = req.query.id;
    const resume = req.file.path; // File path from Cloudinary

    // Ensure the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

       // Update candidate document to include the applied job
       const updateResult = await User.findByIdAndUpdate(userId, { $addToSet: { appliedJobs: jobId } });
       if (!updateResult) {
         return res.status(404).json({
           success: false,
           message: 'Candidate not found',
         });
       }

    // Create the job application
    const jobApplication = new JobApplication({
      job: jobId,
      candidate: userId,
      resume,
      coverLetter,
    });

    await jobApplication.save();

       // Send email notification to the candidate

    const candidateEmail = req.user.email; // Assuming you have the user's email in req.user
    const candidateName = req.user.name; // Assuming you have the user's name in req.user
    const jobTitle = req.user.role;
    console.log(candidateEmail, candidateName, req.user);

    const subject = 'Application Successful';
    const text = 'You have successfully applied for the job.';
    const htmlFilePath = '../templates/applicationSuccess.html';
    const placeholders = { name: candidateName, jobTitle };
    await sendEmail(candidateEmail, subject, text, htmlFilePath, placeholders);
  
      return res.status(200).json({
        success: true,
        message: 'Application submitted successfully and email sent.',
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};



// controllers/jobApplicationController.js


exports.getJobApplicationsForEmployer = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all jobs posted by the employer
    const jobs = await Job.find({ employer: userId });

    if (jobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No jobs found for this employer',
        jobApplications: [],
      });
    }

    // Log the jobs and their IDs
    console.log("Jobs found:", jobs);
    const jobIds = jobs.map(job => job._id);
    console.log("Job IDs:", jobIds);

    // Find all job applications for these jobs
    const jobApplications = await JobApplication.find({ job: { $in: jobIds } }) 
    .populate('candidate', 'name')
    .populate('job', 'title');

    // Log the job applications
    console.log("Job Applications found:", jobApplications);

    if (jobApplications.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No job applications found for this employer',
        jobApplications: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job applications fetched successfully',
      jobApplications,
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
