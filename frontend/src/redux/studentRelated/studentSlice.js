import { createSlice } from "@reduxjs/toolkit";

// Initial state defines the structure and default values for student data management
const initialState = {
    studentsList: [],     // Stores the list of students
    loading: false,       // Tracks API request status
    error: null,          // Stores error information if any
    response: null,       // Stores API response data
    statestatus: "idle",  // Tracks the overall state status
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // Sets loading state when initiating a request
        getRequest: (state) => {
            state.loading = true;
        },
        
        // Resets state after an operation completes successfully
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        
        // Updates state with fetched students data
        getSuccess: (state, action) => {
            state.studentsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        
        // Handles API responses that aren't errors but didn't succeed
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        // Handles error cases from API requests
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Resets the state to idle condition
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

// Export individual actions for use in components and thunks
export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,
} = studentSlice.actions;

// Export the reducer for store configuration
export const studentReducer = studentSlice.reducer;
