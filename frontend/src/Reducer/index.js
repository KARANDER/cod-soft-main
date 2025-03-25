import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../Slices/authSlice";
import profileSlice from "../Slices/profileSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileSlice,
})

export default rootReducer