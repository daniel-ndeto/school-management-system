import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of API request
    
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Handle API error response
        } else {
            dispatch(getSuccess(result.data)); // Update store with fetched student data
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network or request failures
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of update operation
    
    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' }, // Ensure proper content type for PUT
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Handle API error response
        } else {
            dispatch(stuffDone()); // Signal successful update completion
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network or request failures
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of removal operation
    
    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`); // Note: Using PUT for deletion
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Handle API error response
        } else {
            dispatch(stuffDone()); // Signal successful removal
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network or request failures
    }
}
