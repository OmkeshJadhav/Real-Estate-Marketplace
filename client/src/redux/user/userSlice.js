import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null;
            state.loading = true;
        },
        signInSuccess: (state, action) => {  // action is the data that we recive 
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        clearError: (state) => {
            state.error = null;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, clearError } = userSlice.actions

export default userSlice.reducer