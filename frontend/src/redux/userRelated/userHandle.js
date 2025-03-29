import axios from 'axios'; // Importing axios for making HTTP requests
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice'; // Importing Redux actions from userSlice

// Function to log in a user based on their role
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest()); // Dispatching an action to indicate the login request has started

    try {
        // Sending a POST request to log in the user
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' }, // Setting the request headers
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data)); // Dispatching success action if login is successful
        } else {
            dispatch(authFailed(result.data.message)); // Dispatching failure action with the error message
        }
    } catch (error) {
        dispatch(authError(error)); // Dispatching error action with the caught error
    }
};

// Function to register a user based on their role
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest()); // Dispatching an action to indicate the registration request has started

    try {
        // Sending a POST request to register the user
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' }, // Setting the request headers
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data)); // Dispatching success action if registration is successful
        }
        else if (result.data.school) {
            dispatch(stuffAdded()); // Dispatching action if additional staff is added
        }
        else {
            dispatch(authFailed(result.data.message)); // Dispatching failure action with the error message
        }
    } catch (error) {
        dispatch(authError(error)); // Dispatching error action with the caught error
    }
};

// Function to log out a user
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout()); // Dispatching an action to log out the user
};

// Function to fetch user details based on ID and address
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest()); // Dispatching an action to indicate the request has started

    try {
        // Sending a GET request to fetch user details
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data)); // Dispatching success action with the fetched data
        }
    } catch (error) {
        dispatch(getError(error)); // Dispatching error action with the caught error
    }
}

// Function to delete a user based on ID and address
export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest()); // Dispatching an action to indicate the delete request has started

    try {
        // Sending a DELETE request to delete the user
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Dispatching failure action with the error message
        } else {
            dispatch(getDeleteSuccess()); // Dispatching success action if deletion is successful
        }
    } catch (error) {
        dispatch(getError(error)); // Dispatching error action with the caught error
    }
}

// Function to update user details based on ID and address
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest()); // Dispatching an action to indicate the update request has started

    try {
        // Sending a PUT request to update user details
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' }, // Setting the request headers
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data)); // Dispatching success action if update is successful
        }
        else {
            dispatch(doneSuccess(result.data)); // Dispatching success action with the updated data
        }
    } catch (error) {
        dispatch(getError(error)); // Dispatching error action with the caught error
    }
}

// Function to add staff based on the provided fields and address
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest()); // Dispatching an action to indicate the request has started

    try {
        // Sending a POST request to add staff
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' }, // Setting the request headers
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message)); // Dispatching failure action with the error message
        } else {
            dispatch(stuffAdded(result.data)); // Dispatching success action if staff is added successfully
        }
    } catch (error) {
        dispatch(authError(error)); // Dispatching error action with the caught error
    }
};