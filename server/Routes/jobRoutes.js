const express = require('express');
const { create } = require('../Models/Job');
const { createjob, getAllJob, deleteJob, editJob, getJobsByUser } = require('../Controllers/jobController');
const { auth, isemployer } = require('../Middleware/auth');

const router = express.Router();

router.post('/createjobpost', auth, isemployer, createjob)
router.get("/getalljob",auth, getAllJob);
router.get("/getJobsByUser", auth, getJobsByUser);
router.delete("/deletejob",auth,isemployer, deleteJob);
router.put("/updatejob",auth, isemployer, editJob);

module.exports = router;