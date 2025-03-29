import { createSlice } from "@reduxjs/toolkit";

// Initial state for teacher management
const initialState = {
    teachersList: [],      // Stores list of all teachers
    teacherDetails: [],    // Stores details of a specific teacher
    loading: false,        // Tracks API request status
    error: null,          // Stores error information
    response: null,       // Stores API response messages
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        // Sets loading state when API request starts
        getRequest: (state) => {
            state.loading = true;
        },

        // Updates state with teacher details after successful fetch
        doneSuccess: (state, action) => {
            state.teacherDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        // Updates state with teachers list after successful fetch
        getSuccess: (state, action) => {
            state.teachersList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        // Handles API response messages
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },

        // Handles error states from API requests
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Resets state after successful post operation
        postDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

// Export actions and reducer
export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    doneSuccess,
    postDone
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;
