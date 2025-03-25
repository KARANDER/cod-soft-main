import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './Slices/profileSlice';
import authReducer from './Slices/authSlice'; // Assuming you have an auth slice

const store = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        // other reducers
    },
});

export default store;
