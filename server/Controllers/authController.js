const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(403).send({
        success: false,
        message: "Please enter all the fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists, please sign in",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      userDetails,
      message: "user registered sucessfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed, try again later",
    });
  }
};


//login api
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);  // Debug logging

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please register first",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordCorrect);  // Debug logging

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: user.email, role: user.role, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      console.log("Generated token:", token);  // Debug logging

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);  // Debug logging
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};


//logout api

exports.logout = async (req, res) => {
  try {
    // Clear the cookie containing the token
    res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout failed, please try again",
    });
  }
};