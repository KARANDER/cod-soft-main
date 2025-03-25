const jwt = require("jsonwebtoken");
require("dotenv").config();
// const User = require("../models/User");
const cookieParser = require('cookie-parser');

//auth
exports.auth = async (req, res, next) => {
    try {

        const token = req.cookies.token 
            || req.body.token            
            || req.header("Authorisation").replace("Bearer ", "");
        
        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}


//isemployer
exports.isemployer = async (req, res, next) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for employer only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Candidat can not change',
        })
    }
}

//iscandidate
exports.iscandidate = async (req, res, next) => {
    try {
        if (req.user.role !== "candidate") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for candidate only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Eployer can not change',
        })
    }
}
