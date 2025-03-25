// models/Job.js
const mongoose = require('mongoose');

// Define the Job schema
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
