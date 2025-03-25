// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     role: null,
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     loading: false,
//     jobs: [],
//     jobApplications: [],             
//     // user: null,
//     appliedJob: [],                                  

// };

// const profileSlice = createSlice({
//     name: "profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, action) {
//             state.user = action.payload;
//         },
//         setLoading(state, action) {
//             state.loading = action.payload;
//         },
//         setUserRole(state, action) {
//             state.role = action.payload;
//             console.log("Role set in Redux store:", action.payload);
//         },
//         setJobPost(state, action){
//             state.jobPost = action.payload;
//             console.log("Job post payload:", action.payload);
//         },
//         setJobs(state, action) {
//                 state.jobs = action.payload.jobs;  // Assuming action.payload is an object with 'jobs' and 'appliedJob'
//                 // state.appliedJob = action.payload.appliedJob || []; // Set applied job IDs if available
//             }, 
//         },
//         clearUserData(state) {
//             state.user = null;
//             state.role = null;
//             state.jobs = [];
//             state.jobApplications = [];
//         },
//         setJobsForUser(state, action) {
//             state.jobs = action.payload;
//             console.log("Jobs for user payload:", action.payload);
//         },
//         setJobApplications(state, action) {
//             state.jobApplications = action.payload;
//         },
//          setAppliedJob: (state, action) => {
//                     state.appliedJob.push(action.payload);
//         },

// });

// export const { setUser,setAppliedJob, setLoading, setUserRole, setJobPost, setJobs, clearUserData, setJobsForUser, setJobApplications,  } = profileSlice.actions;
// export default profileSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    jobs: [],
    jobApplications: [],             
    // user: null,
    appliedJob: [],                                  

};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUserRole(state, action) {
            state.role = action.payload;
            console.log("Role set in Redux store:", action.payload);
        },
        setJobPost(state, action){
            state.jobPost = action.payload;
            console.log("Job post payload:", action.payload);
        },
        setJobs(state, action) {
            state.jobs = action.payload;
            state.appliedJob = action.payload.appliedJob; // Set applied job IDs

        },
        clearUserData(state) {
            state.user = null;
            state.role = null;
            state.jobs = [];
            state.jobApplications = [];
        },
        setJobsForUser(state, action) {
            state.jobs = action.payload;
            console.log("Jobs for user payload:", action.payload);
        },
        setJobApplications(state, action) {
            state.jobApplications = action.payload;
        },
        setAppliedJob: (state, action) => {
            state.appliedJob.push(action.payload);
        },
       
    },
});

export const { setUser,setAppliedJob, setLoading, setUserRole, setJobPost, setJobs, clearUserData, setJobsForUser, setJobApplications,  } = profileSlice.actions;
export default profileSlice.reducer;