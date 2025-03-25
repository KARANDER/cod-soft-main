import { toast } from "react-toastify";
import { apiconnector } from "../apiconnector";
import { setJobs } from "../../Slices/profileSlice";
import { setUser } from "../../Slices/profileSlice";
import { setToken } from "../../Slices/authSlice";
import { setJobApplications } from "../../Slices/profileSlice"

export function employerapi(title, description, company, location, salary) {
    return async (dispatch) => {
        const EMPLOYERPOST_API = `http://localhost:4000/api/createjobpost`;
        try{
            const response = await apiconnector("POST", EMPLOYERPOST_API,{
                title, description, company, location, salary
            });

            if(response){
                toast.success("Job created successfully");
                console.log(response, "success post job");
            }
        }
        catch(error){
            console.error(error);
        }
}
}



//job fetched 

export function jobfetched() {
    return async (dispatch) => {
        const EMPLOYERGET_API = `http://localhost:4000/api/getJobsByUser`;
        try {
            const response = await apiconnector("GET", EMPLOYERGET_API, null);

            if (response) {
                toast.success("Jobs fetched successfully");
                dispatch(setJobs(response.data.jobs)); // Assuming response.data.jobs contains the job list
                console.log(response, "success fetch jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch jobs");
        }
    }
}


// Delete job action
export function deleteJob(jobId) {
    return async (dispatch) => {
        const DELETE_JOB_API = `http://localhost:4000/api/deletejob?id=${jobId}`;
        try {
            const response = await apiconnector("DELETE", DELETE_JOB_API);
            if (response) {
                toast.success("Job deleted successfully");
                dispatch(jobfetched()); // Refresh the job list after deletion
                console.log(response, "job deleted");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete job");
        }
    }
}


// Logout action
export const logoutUser = () => {
    return async (dispatch) => {
        try {
            // Optionally, you can call an API endpoint to invalidate the session on the server
            // await apiconnector("POST", "http://localhost:4000/api/logout");

            // Clear the user data from the state
            dispatch(setUser(null));
            dispatch(setToken(null));

            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed, please try again");
        }
    };
};
// Clear user data action
function clearUserData() {
    return {
        type: "CLEAR_USER_DATA"
    }
}


export function getJobApplicationsForEmployer() {
    return async (dispatch, getState) => {
        const EMPLOYER_JOB_APPLICATIONS_API = `http://localhost:4000/api/getJobApplicationsForEmployer`;
        const token = getState().auth.token; // Assuming you store the token in auth slice

        try {
            const response = await apiconnector("GET", EMPLOYER_JOB_APPLICATIONS_API, null
        );

            if (response.data.success) {
                toast.success("Job applications fetched successfully");
                dispatch(setJobApplications(response.data.jobApplications));
                console.log(response, "success fetch job applications");
            } else {
                toast.error("Failed to fetch job applications");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch job applications");
        }
    };
}