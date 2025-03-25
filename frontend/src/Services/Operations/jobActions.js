import { apiconnector } from '../apiconnector';
import { toast } from 'react-toastify';
import { setJobsForUser } from '../../Slices/profileSlice';

// Fetch filtered jobs
// services/Operations/jobApi.js

// Fetch filtered jobs
export function fetchFilteredJobs(query) {
    return async (dispatch) => {
        const FILTERED_JOBS_API = `http://localhost:4000/api/getalljob?title=${query}`;
        try {
            const response = await apiconnector("GET", FILTERED_JOBS_API, null);

            if (response) {
                toast.success("Jobs fetched successfully");
                dispatch(setJobsForUser(response.data.jobs)); 
                console.log(response, "success fetch jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch jobs");
        }
    }
}
