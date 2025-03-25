const express = require('express');
const { register, login, logout } = require('../Controllers/authController');
const router = express.Router();

// route for user registrartion 
router.post('/register', register);

router.post('/login',login);

// route for user logout
router.post('/logout', logout);

module.exports = router;