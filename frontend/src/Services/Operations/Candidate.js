import { apiconnector } from '../apiconnector';
import { toast } from 'react-toastify';
import { setAppliedJob, setJobsForUser } from '../../Slices/profileSlice';
// get all job by candidate
export function getalljobByuser() {
    return async (dispatch) => {
        const CANDIDATE_ALLJOB_GET_API = `http://localhost:4000/api/getalljob`;
        try {
            const response = await apiconnector("GET", CANDIDATE_ALLJOB_GET_API, null);

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


// Apply for a job

export function applyForJob(jobId, formData) {
    return async (dispatch) => {
        const APPLY_JOB_API = `http://localhost:4000/api/applyjob?id=${jobId}`;
        try {
            const response = await apiconnector("POST", APPLY_JOB_API, formData, {
                'Content-Type': 'multipart/form-data'
            });
            console.log(response,"respone of applyjob");

            if (response.data.success) {
                toast.success("Job application submitted successfully");
                dispatch(setAppliedJob(jobId)); // Dispatch action to update the Redux store
                console.log(response.data, "Job application success");
            } else {
                toast.error(response.data.message || "Failed to apply for the job");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to apply for the job");
        }
    }
}
