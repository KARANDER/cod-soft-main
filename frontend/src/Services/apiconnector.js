import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api",
  withCredentials: true, // Include credentials (cookies)
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/api/auth/refresh-token",
      {},
      { withCredentials: true } // Include refresh token in cookies
    );
    const newAccessToken = response.data.accessToken;

    // Store the new access token (e.g., in localStorage)
    localStorage.setItem("accessToken", newAccessToken);

    // Update the default Authorization header
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Axios response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses
  async error => {
    if (error.response && error.response.status === 401) {
      console.warn("Access token expired. Attempting to refresh token...");
      try {
        // Refresh the token
        await refreshToken();

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed. Redirecting to login...");
        // Optionally, redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const apiconnector = (method, url, bodyData, headers, params) => {
  console.log("API Connector Call:", method, url, bodyData, headers, params); // Debug logging
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : {},
    params: params ? params : null,
  })
    .then(response => {
      console.log("API Connector Response:", response); // Debug logging
      return response;
    })
    .catch(error => {
      console.error("API Connector Error:", error); // Debug logging
      throw error;
    });
};