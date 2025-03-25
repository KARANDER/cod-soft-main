const Job = require("../Models/Job");
const User = require("../Models/User"); // Import the User model

exports.createjob = async (req, res) => {
  try {
    const userId = req.user.id || ""; // Extract user ID from req.user.id

    // Fetch user data from the User model
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company || !location || !salary) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the fields",
      });
    } else {
      // Create the job and associate it with the user
      const response = await Job.create({
        title,
        description,
        company,
        location,
        salary,
        employer: user._id, // Assign the user's ID to the job's employer field
      });
      console.log(response);
    }

    return res.status(200).json({
      success: true,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Job creation failed",
    });
  }
};


//get api

exports.getAllJob = async (req, res) => {
  try {
    // Fetch all job postings
    const jobs = await Job.find();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get specific data only

exports.getJobsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated user

    // Find all job postings created by the user
    const jobs = await Job.find({ employer: userId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      jobs: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//edit api

exports.editJob = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from request
    const jobId = req.query.id; // Extract job ID from request parameters
    const { title, description, company, location, salary } = req.body;

    // Construct an object with the fields to update
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (company) updateFields.company = company;
    if (location) updateFields.location = location;
    if (salary) updateFields.salary = salary;

    // Check if the job belongs to the user (employer)
    const job = await Job.findOne({ _id: jobId, employer: userId });
    console.log(job); 
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized",
      });
    }

    // Update the job fields
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      updateFields,
      { new: true } // Return the updated job document
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};





//delete api

exports.deleteJob = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from request
    const jobId = req.query.id; // Extract job ID from query parameters

    // Check if the job belongs to the user (employer)
    const job = await Job.findOneAndDelete({ _id: jobId, employer: userId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or unauthorized',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

