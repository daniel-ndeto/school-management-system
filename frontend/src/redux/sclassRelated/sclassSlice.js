import { createSlice } from "@reduxjs/toolkit";

// Initial state object containing all data related to school classes and subjects
const initialState = {
    sclassesList: [],        // List of school classes
    sclassStudents: [],      // Students in a specific class
    sclassDetails: [],       // Details of a specific class
    subjectsList: [],        // List of subjects
    subjectDetails: [],      // Details of a specific subject
    loading: false,          // Main loading state
    subloading: false,       // Secondary loading state for subject operations
    error: null,             // Error state
    response: null,          // Response for subject operations
    getresponse: null,       // Response for class operations
};

const sclassSlice = createSlice({
    name: 'sclass',
    initialState,
    reducers: {
        // Sets loading state to true when fetching data
        getRequest: (state) => {
            state.loading = true;
        },
        
        // Sets subject loading state to true when fetching subject details
        getSubDetailsRequest: (state) => {
            state.subloading = true;
        },
        
        // Updates state with fetched classes list
        getSuccess: (state, action) => {
            state.sclassesList = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        
        // Updates state with fetched students for a class
        getStudentsSuccess: (state, action) => {
            state.sclassStudents = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        
        // Updates state with fetched subjects list
        getSubjectsSuccess: (state, action) => {
            state.subjectsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        
        // Handles failure in subject operations
        getFailed: (state, action) => {
            state.subjectsList = [];
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        // Handles failure in class operations
        getFailedTwo: (state, action) => {
            state.sclassesList = [];
            state.sclassStudents = [];
            state.getresponse = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        // Sets error state when operations fail with an error
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Updates state with fetched class details
        detailsSuccess: (state, action) => {
            state.sclassDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        // Updates state with fetched subject details
        getSubDetailsSuccess: (state, action) => {
            state.subjectDetails = action.payload;
            state.subloading = false;
            state.error = null;
        },
        
        // Resets subjects and classes lists to empty arrays
        resetSubjects: (state) => {
            state.subjectsList = [];
            state.sclassesList = [];
        },
    },
});

// Export all action creators for use in components and thunks
export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    getSubjectsSuccess,
    detailsSuccess,
    getFailedTwo,
    resetSubjects,
    getSubDetailsSuccess,
    getSubDetailsRequest
} = sclassSlice.actions;

// Export the reducer for store configuration
export const sclassReducer = sclassSlice.reducer;
