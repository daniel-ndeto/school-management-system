import axios from 'axios';
// Import action creators from Redux slice
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

// Fetch all teachers for a given ID using Redux Thunk
export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of API request

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Handle API error message
        } else {
            dispatch(getSuccess(result.data)); // Update store with teachers data
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network/request errors
    }
}

// Fetch detailed information for a specific teacher
export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of API request

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data)); // Update store with teacher details
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network/request errors
    }
}

// Update a teacher's subject assignment
export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest()); // Signal start of API request

    try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/TeacherSubject`, 
            { teacherId, teachSubject }, 
            { headers: { 'Content-Type': 'application/json' } }
        );
        dispatch(postDone()); // Signal successful update
    } catch (error) {
        dispatch(getError(error)); // Handle network/request errors
    }
}
