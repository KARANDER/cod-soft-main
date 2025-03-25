const express = require('express');
const { applyForJob, getJobApplicationsForEmployer } = require('../Controllers/jobApplicationController');
const { iscandidate, auth } = require('../Middleware/auth');
const upload = require('../Middleware/fileupload');
const router = express.Router();


router.post('/applyjob', auth, iscandidate, upload.single('resume'), applyForJob);
router.get('/getJobApplicationsForEmployer',auth, getJobApplicationsForEmployer);
module.exports = router;
