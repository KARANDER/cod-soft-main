// models/JobApplication.js
const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    // required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
module.exports = JobApplication;
