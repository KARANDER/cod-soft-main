import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
            // Save token to localStorage
            localStorage.setItem('token', action.payload);
        },
    }
})

export const { setSignupData, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
