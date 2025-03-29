import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

// Fetches all classes for a given ID and address type
export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        result.data.message ? dispatch(getFailedTwo(result.data.message)) : dispatch(getSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
}

// Retrieves all students belonging to a specific class ID
export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Sclass/Students/${id}`);
        result.data.message ? dispatch(getFailedTwo(result.data.message)) : dispatch(getStudentsSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
}

// Fetches detailed information about a specific class
export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

// Retrieves list of subjects for a specific class or category
export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        result.data.message ? dispatch(getFailed(result.data.message)) : dispatch(getSubjectsSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
}

// Gets subjects that don't have assigned teachers for a specific class
export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/FreeSubjectList/${id}`);
        result.data.message ? dispatch(getFailed(result.data.message)) : dispatch(getSubjectsSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
}

// Fetches detailed information about a specific subject
export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
