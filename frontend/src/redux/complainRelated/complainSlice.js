import { createSlice } from "@reduxjs/toolkit";

// Initial state for complains management
const initialState = {
    complainsList: [],    // Stores list of complains
    loading: false,       // Tracks loading state
    error: null,         // Stores error information
    response: null,      // Stores API response
};

const complainSlice = createSlice({
    name: 'complain',
    initialState,
    reducers: {
        // Sets loading state when fetching complains
        getRequest: (state) => {
            state.loading = true;
        },

        // Updates state with fetched complains data
        getSuccess: (state, action) => {
            state.complainsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        // Handles API response for failed requests
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },

        // Handles error states in the application
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

// Export actions for use in components
export const {
    getRequest,
    getSuccess,
    getFailed,
    getError
} = complainSlice.actions;

// Export reducer for store configuration
export const complainReducer = complainSlice.reducer;
