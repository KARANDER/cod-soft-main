# Job Portal Application 💼🚀

This project is a full-stack job portal application with a backend built using **Node.js, Express, and MongoDB**, and a frontend built using **React**. It enables job seekers to apply for jobs and employers to post job listings.

## Features 🌟
- **User Authentication**: Registration, login, and token-based authentication.
- **Job Listings**: Employers can create, update, and delete job posts.
- **Candidate Management**: Users can apply for jobs and manage their applications.
- **Token Refresh Mechanism**: Secure authentication with auto-refreshing tokens.
- **State Management**: Frontend API calls handled via Axios with interceptors.

---

## Backend Setup 🛠️
### 1️⃣ Install Dependencies
```bash
cd server
npm install
```
### 2️⃣ MongoDB Connection String Setup
Create a `.env` file in the backend directory and add your MongoDB connection string:
```bash
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```
Ensure your `config.js` handles this connection properly:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```
### 3️⃣ Start the Server
```bash
npm run start
```
Backend server will be available at: **http://localhost:4000**

---

## Frontend Setup 🎨
### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```
### 2️⃣ Set Up Environment Variables
Create a `.env` file in the frontend directory:
```bash
REACT_APP_BASE_URL=http://localhost:4000
```
### 3️⃣ Start the Frontend
```bash
npm  run start
```
Frontend will be available at: **http://localhost:3000**

---

## API Connection & Authentication 🔑
The Axios instance is set up to handle authentication and token refresh.
```javascript
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api",
  withCredentials: true, // Include credentials (cookies)
});
```
### Token Refresh Mechanism
```javascript
const refreshToken = async () => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/api/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
```
---

## Running the Project ▶️
### 1️⃣ Start the Backend:
```bash
cd server
npm install
npm run start
```
### 2️⃣ Start the Frontend:
```bash
cd frontend
npm install
npm run start
```

---

## Future Enhancements 🚀
- Implement role-based authentication for admins and recruiters.
- Add job filtering and search functionality.
- Improve UI with animations and better responsiveness.
- Implement real-time notifications for job applications.

## Acknowledgments 🙏
- Built with **Node.js, Express, MongoDB, and React**.
- Uses JWT for authentication and secure API access.

## License 🔒
This project is licensed under the MIT License.

---

I’m a beginner coder on a mission to create and learn. Your feedback means a lot!  
Contact me at: [derkaran@gmail.com](mailto:derkaran@gmail.com)  
Connect with me on LinkedIn: [![LinkedIn](https://img.shields.io/badge/LinkedIn-Karan%20Der-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/karan-der/)

